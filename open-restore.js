#!/usr/bin/env node

/**
 * Opens the RESTORE-NOW.html file in the default browser
 */

import { exec } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import { platform } from 'os'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const htmlPath = join(__dirname, 'RESTORE-NOW.html')

console.log('╔════════════════════════════════════════════╗')
console.log('║     🚀 OPENING RESTORATION TOOL...         ║')
console.log('╚════════════════════════════════════════════╝\n')

// Determine the command based on the platform
let command
const os = platform()

switch (os) {
  case 'darwin': // macOS
    command = `open "${htmlPath}"`
    break
  case 'win32': // Windows
    command = `start "" "${htmlPath}"`
    break
  default: // Linux and others
    command = `xdg-open "${htmlPath}" || firefox "${htmlPath}" || google-chrome "${htmlPath}"`
    break
}

console.log('📂 Opening restoration page in your browser...')
console.log(`   File: ${htmlPath}\n`)

exec(command, (error) => {
  if (error) {
    console.error('❌ Could not open browser automatically.')
    console.error('   Please manually open this file in your browser:')
    console.error(`   ${htmlPath}\n`)
    console.error('   Or run: open RESTORE-NOW.html\n')
    process.exit(1)
  } else {
    console.log('✅ Restoration page opened!')
    console.log('\n📌 What to do next:')
    console.log('   1. Click the "Restore My Images Now" button')
    console.log('   2. Wait for the success message')
    console.log('   3. Refresh your website at http://localhost:5173')
    console.log('   4. Your 12 images will be back! 🎉\n')
  }
})
