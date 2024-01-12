import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin'

export const theme: CustomThemeConfig = {
  name: 'jet-black',
  properties: {
    // =~= Theme Properties =~=
    '--theme-font-family-base': `system-ui`,
    '--theme-font-family-heading': `system-ui`,
    '--theme-font-color-base': '0 0 0',
    '--theme-font-color-dark': '255 255 255',
    '--theme-rounded-base': '9999px',
    '--theme-rounded-container': '8px',
    '--theme-border-base': '1px',
    // =~= Theme On-X Colors =~=
    '--on-primary': '0 0 0',
    '--on-secondary': '0 0 0',
    '--on-tertiary': '255 255 255',
    '--on-success': '0 0 0',
    '--on-warning': '0 0 0',
    '--on-error': '0 0 0',
    '--on-surface': '255 255 255',
    // =~= Theme Colors  =~=
    // primary | #fafafa
    '--color-primary-50': '254 254 254', // #fefefe
    '--color-primary-100': '254 254 254', // #fefefe
    '--color-primary-200': '254 254 254', // #fefefe
    '--color-primary-300': '253 253 253', // #fdfdfd
    '--color-primary-400': '252 252 252', // #fcfcfc
    '--color-primary-500': '250 250 250', // #fafafa
    '--color-primary-600': '225 225 225', // #e1e1e1
    '--color-primary-700': '188 188 188', // #bcbcbc
    '--color-primary-800': '150 150 150', // #969696
    '--color-primary-900': '123 123 123', // #7b7b7b
    // secondary | #0070f3
    '--color-secondary-50': '217 234 253', // #d9eafd
    '--color-secondary-100': '204 226 253', // #cce2fd
    '--color-secondary-200': '191 219 252', // #bfdbfc
    '--color-secondary-300': '153 198 250', // #99c6fa
    '--color-secondary-400': '77 155 247', // #4d9bf7
    '--color-secondary-500': '0 112 243', // #0070f3
    '--color-secondary-600': '0 101 219', // #0065db
    '--color-secondary-700': '0 84 182', // #0054b6
    '--color-secondary-800': '0 67 146', // #004392
    '--color-secondary-900': '0 55 119', // #003777
    // tertiary | #b8143d
    '--color-tertiary-50': '244 220 226', // #f4dce2
    '--color-tertiary-100': '241 208 216', // #f1d0d8
    '--color-tertiary-200': '237 196 207', // #edc4cf
    '--color-tertiary-300': '227 161 177', // #e3a1b1
    '--color-tertiary-400': '205 91 119', // #cd5b77
    '--color-tertiary-500': '184 20 61', // #b8143d
    '--color-tertiary-600': '166 18 55', // #a61237
    '--color-tertiary-700': '138 15 46', // #8a0f2e
    '--color-tertiary-800': '110 12 37', // #6e0c25
    '--color-tertiary-900': '90 10 30', // #5a0a1e
    // success | #159e1e
    '--color-success-50': '220 240 221', // #dcf0dd
    '--color-success-100': '208 236 210', // #d0ecd2
    '--color-success-200': '197 231 199', // #c5e7c7
    '--color-success-300': '161 216 165', // #a1d8a5
    '--color-success-400': '91 187 98', // #5bbb62
    '--color-success-500': '21 158 30', // #159e1e
    '--color-success-600': '19 142 27', // #138e1b
    '--color-success-700': '16 119 23', // #107717
    '--color-success-800': '13 95 18', // #0d5f12
    '--color-success-900': '10 77 15', // #0a4d0f
    // warning | #eed111
    '--color-warning-50': '252 248 219', // #fcf8db
    '--color-warning-100': '252 246 207', // #fcf6cf
    '--color-warning-200': '251 244 196', // #fbf4c4
    '--color-warning-300': '248 237 160', // #f8eda0
    '--color-warning-400': '243 223 88', // #f3df58
    '--color-warning-500': '238 209 17', // #eed111
    '--color-warning-600': '214 188 15', // #d6bc0f
    '--color-warning-700': '179 157 13', // #b39d0d
    '--color-warning-800': '143 125 10', // #8f7d0a
    '--color-warning-900': '117 102 8', // #756608
    // error | #fe2a34
    '--color-error-50': '255 223 225', // #ffdfe1
    '--color-error-100': '255 212 214', // #ffd4d6
    '--color-error-200': '255 202 204', // #ffcacc
    '--color-error-300': '255 170 174', // #ffaaae
    '--color-error-400': '254 106 113', // #fe6a71
    '--color-error-500': '254 42 52', // #fe2a34
    '--color-error-600': '229 38 47', // #e5262f
    '--color-error-700': '191 32 39', // #bf2027
    '--color-error-800': '152 25 31', // #98191f
    '--color-error-900': '124 21 25', // #7c1519
    // surface | #000000
    '--color-surface-50': '217 217 217', // #d9d9d9
    '--color-surface-100': '204 204 204', // #cccccc
    '--color-surface-200': '191 191 191', // #bfbfbf
    '--color-surface-300': '153 153 153', // #999999
    '--color-surface-400': '77 77 77', // #4d4d4d
    '--color-surface-500': '0 0 0', // #000000
    '--color-surface-600': '0 0 0', // #000000
    '--color-surface-700': '0 0 0', // #000000
    '--color-surface-800': '0 0 0', // #000000
    '--color-surface-900': '0 0 0' // #000000
  }
}
