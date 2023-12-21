import fs, { readdirSync } from 'node:fs'
import { join, basename } from 'node:path'
import { asyncTryOrElse, obsidianVaultPath, pb } from './utils.js'
import type { ObsidianFolder, PBVaultFolder } from './types.js'
import Result from 'true-myth/result'
import { RecordModel } from 'pocketbase'
import matter from 'gray-matter'

function parseFileTree(path: string, level = 0): ObsidianFolder[] {
  if (level === 0) {
    for (const dir of readdirSync(path)) {
      parseFileTree
    }
  }
  const tree: ObsidianFolder = {
    name: basename(path),
    level,
    files: [],
    meta: {
      uuid: '',
      description: '',
      other: {}
    },
    subfolders: []
  }

  const dir = fs.readdirSync(path)
  for (const name of dir) {
    const filePath = join(path, name)

    // Handling dirs
    if (name === '.obsidian') {
      // This directory is special metadata directory created and managed by obsidian
      continue
    } else if (name === '_meta.md') {
      // This is a special file that should be present on all directories
      // It contains information about the current directory, such as uuid, description, etc
      tree.meta = matter(fs.readFileSync(filePath, 'utf-8'))
        .data as ObsidianFolder['meta']

      continue
    }

    // Handling subfolders
    const isDirectory = fs.lstatSync(filePath).isDirectory()
    if (isDirectory) {
      tree.subfolders.push(parseFileTree(filePath, level + 1))
      continue
    }

    // Handling files
    else {
      const fileContent = fs.readFileSync(filePath, 'utf-8')
      const frontmatter = matter(fileContent)
      const file: ObsidianFolder['files'][number] = {
        filename: name,
        content: fileContent,
        uuid: frontmatter.data.id
      }
      tree.files.push(file)
    }
  }

  return tree
}

async function updatePocketbaseFileTree(
  localFolder: ObsidianFolder,
  parentId: string | null = null
) {
  console.log(`Syncing ${localFolder.name} at level ${localFolder.level}`)

  let currentFolderId = ''

  // Plan:
  // 1: Get all folders under the parentId record
  // 2: Delete all folders that are not in the local
  // 3: Upsert all folders that are in the local
  // 4: Repeat for files

  // Get all folders in the database with the parentId = parentId

  const pbFolders = await pb.collection('vaultFolders').getFullList({
    filter: parentId ? `parentId="${parentId}"` : "parentId=''"
  })

  // Delete any folder that is not in local using the uuid in meta
  const toDeleteFolders = pbFolders.filter(
    pbFolder => !localFolder.subfolders.find(f => f.meta.uuid === pbFolder.uuid)
  )
  for (const pbFolder of toDeleteFolders) {
    await pb.collection('vaultFolders').delete(pbFolder.id)
  }
  // Loop over all local folders

  // // Upserting the folder model
  // let res = await asyncTryOrElse(
  //   async () =>
  //     await pb
  //       .collection('vaultFolders')
  //       .getFirstListItem(`uuid="${folder.meta.uuid}"`),
  //   err => Result.err(err)
  // )

  // // If the folder does not exist, create it
  // const body:PBVaultFolder = {
  //   uuid: folder.meta.uuid,
  //   name: folder.name,
  //   level: folder.level,
  //   parentId,
  //   meta:folder.meta
  // }

  // if (res.isErr) {
  //   const { id } = await pb.collection('vaultFolders').create(body)
  //   currentFolderId = id
  // } else {
  //   const { id } = await pb.collection('vaultFolders').update(res.value.id, {
  //     label,
  //     level,
  //     meta,
  //     parentId
  //   })
  //   currentFolderId = id
  // }

  // // Upserting the files
  // // Get all files in the database with the parentId = current folder
  // const pbFiles = await pb
  //   .collection('obsidianFiles')
  //   .getFullList<
  //     ObsidianFolder['files'][number] & { parentId: string } & RecordModel
  //   >({
  //     filter: `parentId="${currentFolderId}"`
  //   })

  // // Delete any file that is not in local
  // const toDeleteRecords = pbFiles.filter(
  //   pbFile => !folder.files.find(f => f.filename === pbFile.filename)
  // )

  // for (const record of toDeleteRecords) {
  //   await pb.collection('obsidianFiles').delete(record.id)
  // }

  // // Sync others
  // for (const file of folder.files) {
  //   const fileInTree = pbFiles.find(f => f.filename === file.filename)
  //   if (!fileInTree) {
  //     await pb.collection('obsidianFiles').create({
  //       ...file,
  //       parentId: currentFolderId
  //     })
  //   } else {
  //     await pb.collection('obsidianFiles').update(fileInTree.id, {
  //       ...file,
  //       parentId: currentFolderId
  //     })
  //   }
  // }
  // for (const subfolder of folder.subfolders) {
  //   await updatePocketbaseFileTree(subfolder, currentFolderId)
  // }
}

function preParseObsidianTree(path: string): ObsidianFolder[] {
  const tree: ObsidianFolder[] = []
  const dirList = fs.readdirSync(path).filter(fName => fName !== '.obsidian')

  for (const p of dirList) {
    tree.push(parseObsidianTree(join(path, p)))
  }
  return tree
}

function parseObsidianTree(path: string): ObsidianFolder {
  // Get meta of current folder
  const metaPath = join(path, '_meta.md')
  const meta = matter(fs.readFileSync(metaPath, 'utf-8'))
    .data as ObsidianFolder['meta']

  // Get files and content
  const files = fs
    .readdirSync(path)
    .filter(fName => fName !== '_meta.md' && fName !== '.obsidian')
    .filter(fName => !fs.lstatSync(join(path, fName)).isDirectory())
    .map(fName => {
      const p = join(path, fName)
      const content = fs.readFileSync(p, 'utf-8')
      const frontmatter = matter(content)
        .data as ObsidianFolder['files'][number]['frontmatter']
      const file: ObsidianFolder['files'][number] = {
        filename: fName,
        content,
        frontmatter
      }
      return file
    })

  // Get subfolders
  const subfolders = fs
    .readdirSync(path)
    .filter(fName => fName !== '_meta.md' && fName !== '.obsidian')
    .filter(fName => fs.lstatSync(join(path, fName)).isDirectory())
    .flatMap(dirName => parseObsidianTree(join(path, dirName)))

  const obsidianFolder: ObsidianFolder = {
    filename: basename(path),
    meta,
    files,
    subfolders
  }

  return obsidianFolder
}

async function syncTree(folder: ObsidianFolder, parentId?: string) {
  // console.log(tree)
  // See if this folder with this uuid exists
  let currentFolderId = ''
  const res = await asyncTryOrElse(
    async () =>
      await pb
        .collection('vaultFolders')
        .getFirstListItem(`uuid="${folder.meta.uuid}"`),
    err => Result.err(err)
  )

  if (res.isErr) {
    const { id } = await pb.collection('vaultFolders').create({
      uuid: folder.meta.uuid,
      filename: folder.filename,
      meta: folder.meta,
      parentId
    })
    currentFolderId = id
  } else {
    console.log(res.value)
    console.log(folder.meta.uuid)
    currentFolderId = res.value.id
  }

  for (const subfolder of folder.subfolders) {
    // console.log(subfolder.filename)
    await syncTree(subfolder, currentFolderId)
  }

  // Upsert the folder
  // Upsert the files
  // Sync the subfolders
}
export async function sync() {
  console.log('Parsing file tree')
  const tree = preParseObsidianTree(obsidianVaultPath)
  // const tree = parseFileTree(obsidianVaultPath)
  console.log('Done parsing')

  console.log('Syncing to Pocketbase')
  // await updatePocketbaseFileTree(tree, null)
  await Promise.all(tree.map(folder => syncTree(folder)))
  console.log('Done syncing to Pocketbase')
}
