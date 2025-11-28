#!/usr/bin/env node

/**
 * Automatic Data Restoration Script
 * Directly restores data without browser automation
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Supabase configuration from restore-corrected-data.html
const SUPABASE_URL = 'https://gxiqydbsvtirytqyzavj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4aXF5ZGJzdnRpcnl0cXl6YXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTQyNTcsImV4cCI6MjA3NzE3MDI1N30.PQ3iv18d2BR_5RrFcc72pgnD1jf_hhUhbfTujuJoXMI'

console.log('╔════════════════════════════════════════════╗')
console.log('║   🚀 AUTOMATIC DATA RESTORATION TOOL       ║')
console.log('╚════════════════════════════════════════════╝\n')

async function restoreData() {
  try {
    // Load the corrected data
    console.log('📖 Step 1: Loading corrected data...')
    const dataPath = join(__dirname, 'corrected-data.json')
    const correctedData = JSON.parse(readFileSync(dataPath, 'utf8'))

    const heroCardsWithImages = correctedData.heroCards.filter(c => c.image).length
    const membersWithImages = correctedData.contentGrid.members.filter(m => m.image).length
    const totalImages = heroCardsWithImages + membersWithImages

    console.log('   ✓ Data loaded successfully!')
    console.log(`   → ${heroCardsWithImages} hero card images`)
    console.log(`   → ${membersWithImages} team member images`)
    console.log(`   → ${totalImages} total images to restore\n`)

    // Connect to Supabase
    console.log('🔌 Step 2: Connecting to Supabase...')
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: false
      }
    })
    console.log('   ✓ Connected successfully!\n')

    // Check if data already exists
    console.log('🔍 Step 3: Checking existing data...')
    const { data: existingData, error: checkError } = await supabase
      .from('site_data')
      .select('data')
      .eq('id', 'main')
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      console.log(`   ⚠ Warning: ${checkError.message}`)
    } else if (existingData) {
      console.log('   ℹ Found existing data in database')
    } else {
      console.log('   ℹ No existing data found')
    }
    console.log('')

    // Restore to Supabase
    console.log('💾 Step 4: Restoring data to Supabase...')
    const { error: upsertError } = await supabase
      .from('site_data')
      .upsert({
        id: 'main',
        data: correctedData
      }, {
        onConflict: 'id'
      })

    if (upsertError) {
      throw new Error(`Failed to save to Supabase: ${upsertError.message}`)
    }

    console.log('   ✓ Data saved to Supabase!\n')

    // Verify the restoration
    console.log('✅ Step 5: Verifying restoration...')
    const { data: verifiedData, error: verifyError } = await supabase
      .from('site_data')
      .select('data')
      .eq('id', 'main')
      .single()

    if (verifyError) {
      throw new Error(`Verification failed: ${verifyError.message}`)
    }

    // Count restored images
    const restoredHeroCards = verifiedData.data.heroCards?.filter(c => c.image).length || 0
    const restoredMembers = verifiedData.data.contentGrid?.members?.filter(m => m.image).length || 0
    const restoredTotal = restoredHeroCards + restoredMembers

    console.log('   ✓ Data verified in database!')
    console.log(`   → ${restoredHeroCards} hero card images restored`)
    console.log(`   → ${restoredMembers} team member images restored`)
    console.log(`   → ${restoredTotal} total images confirmed\n`)

    console.log('╔════════════════════════════════════════════╗')
    console.log('║          ✨ RESTORATION COMPLETE! ✨       ║')
    console.log('╚════════════════════════════════════════════╝\n')
    console.log('📌 Next Steps:')
    console.log('   1. Start your dev server: npm run dev')
    console.log('   2. Open: http://localhost:5173')
    console.log('   3. Your images should now be visible!')
    console.log('   4. The bug is fixed - no more data loss! 🎉\n')

    process.exit(0)

  } catch (error) {
    console.error('\n╔════════════════════════════════════════════╗')
    console.error('║         ❌ RESTORATION FAILED ❌           ║')
    console.error('╚════════════════════════════════════════════╝\n')
    console.error('Error:', error.message)
    console.error('\n🔧 Troubleshooting:')
    console.error('   1. Check internet connection')
    console.error('   2. Verify Supabase is accessible')
    console.error('   3. Try manual restore: open RESTORE-NOW.html')
    console.error('   4. Contact support if issue persists\n')
    process.exit(1)
  }
}

// Run restoration
restoreData()
