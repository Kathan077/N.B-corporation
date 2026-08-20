import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  root: __dirname,
  plugins: [react()],
  server: {
    fs: {
      strict: true,
      allow: [__dirname],
    },
    watch: {
      ignored: [
        '**/$Recycle.Bin/**',
        '**/OneDriveTemp/**',
        '**/.git/**',
        '**/node_modules/**',
      ],
    },
  },
})
