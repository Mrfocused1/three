// Paste this into your browser console on the admin page to check Supabase

// Check localStorage first
console.log('=== CHECKING LOCALSTORAGE ===');
const localData = localStorage.getItem('siteData');
if (localData) {
    console.log('✓ Found data in localStorage:', JSON.parse(localData));
} else {
    console.log('✗ No data in localStorage');
}

// Check Supabase
console.log('\n=== CHECKING SUPABASE ===');
console.log('Go to your Supabase dashboard:');
console.log('https://supabase.com/dashboard/project/amiwavztjjldikakrzis');
console.log('\n1. Click on "Table Editor"');
console.log('2. Select "site_data" table');
console.log('3. Look for a row with id="main"');
console.log('4. Check the "data" column - your images should be there');

console.log('\n=== CHECKING STORAGE ===');
console.log('Check your uploaded images:');
console.log('https://supabase.com/dashboard/project/amiwavztjjldikakrzis/storage/buckets/images');
console.log('\nYour uploaded image files should still be here with timestamps in filenames.');

// List what to look for
console.log('\n=== WHAT TO LOOK FOR ===');
console.log('In the data column, you should see image URLs like:');
console.log('https://amiwavztjjldikakrzis.supabase.co/storage/v1/object/public/images/...');
console.log('\nIf you see these URLs, your data is safe and can be recovered!');
