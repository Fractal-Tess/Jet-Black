import { join } from 'node:path'
import { theme } from './theme'
import { fontFamily } from 'tailwindcss/defaultTheme'
import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import typography from '@tailwindcss/typography'
import { skeleton } from '@skeletonlabs/tw-plugin'

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{html,js,svelte,ts}',
    join(
      require.resolve('@skeletonlabs/skeleton'),
      '../**/*.{html,js,svelte,ts}'
    )
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', ...fontFamily.sans],
        sans: ['Roboto', ...fontFamily.sans]
      },
      keyframes: {
        scrollbg: {
          '0%': { 'background-position': '0 0' },
          '100%': { 'background-position': '-100% -100%' }
        }
      },
      animation: {
        'spin-slow': 'spin 9s linear infinite',
        'bg-move-fast': 'scrollbg 90s linear infinite'
      }
    }
  },
  plugins: [
    forms,
    typography,
    skeleton({
      themes: {
        custom: [theme]
      }
    })
  ]
} satisfies Config
