#!/usr/bin/env node

/**
 * Data Restoration Script
 * This script restores your saved images to Supabase database
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Supabase configuration
const SUPABASE_URL = 'https://gxiqydbsvtirytqyzavj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4aXF5ZGJzdnRpcnl0cXl6YXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTQyNTcsImV4cCI6MjA3NzE3MDI1N30.PQ3iv18d2BR_5RrFcc72pgnD1jf_hhUhbfTujuJoXMI'

console.log('🚀 Starting data restoration...\n')

async function restoreData() {
  try {
    // Read the corrected data file
    console.log('📖 Reading corrected data from file...')
    const dataPath = join(__dirname, 'corrected-data.json')
    const correctedData = JSON.parse(readFileSync(dataPath, 'utf8'))

    console.log('✓ Data loaded successfully')
    console.log(`   - ${correctedData.heroCards.length} hero cards`)
    console.log(`   - ${correctedData.contentGrid.members.length} team members`)
    console.log(`   - ${correctedData.twoCardSection.cards.length} two-card section items`)
    console.log(`   - ${correctedData.channels.length} channels\n`)

    // Create Supabase client
    console.log('🔌 Connecting to Supabase...')
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    console.log('✓ Connected to Supabase\n')

    // Restore to Supabase
    console.log('💾 Saving data to Supabase database...')
    const { data, error } = await supabase
      .from('site_data')
      .upsert({
        id: 'main',
        data: correctedData
      })
      .select()

    if (error) {
      console.error('❌ Error saving to Supabase:', error)
      throw error
    }

    console.log('✓ Data saved to Supabase successfully!\n')

    // Verify the data was saved
    console.log('🔍 Verifying data...')
    const { data: verifyData, error: verifyError } = await supabase
      .from('site_data')
      .select('data')
      .eq('id', 'main')
      .single()

    if (verifyError) {
      console.error('❌ Error verifying data:', verifyError)
      throw verifyError
    }

    console.log('✓ Data verified in database\n')

    // Count images
    let imageCount = 0
    if (verifyData.data.heroCards) {
      imageCount += verifyData.data.heroCards.filter(c => c.image).length
    }
    if (verifyData.data.contentGrid?.members) {
      imageCount += verifyData.data.contentGrid.members.filter(m => m.image).length
    }

    console.log('✅ SUCCESS! Data restoration complete!')
    console.log(`   - ${imageCount} images restored`)
    console.log('   - All data safely stored in Supabase')
    console.log('\n📌 Next Steps:')
    console.log('   1. Refresh your website: http://localhost:5173')
    console.log('   2. Your images should now be visible!')
    console.log('   3. All future edits will be automatically saved\n')

  } catch (error) {
    console.error('\n❌ RESTORATION FAILED')
    console.error('Error details:', error.message)
    console.error('\nTroubleshooting:')
    console.error('1. Make sure corrected-data.json exists')
    console.error('2. Check your internet connection')
    console.error('3. Verify Supabase credentials are correct\n')
    process.exit(1)
  }
}

// Run the restoration
restoreData()
