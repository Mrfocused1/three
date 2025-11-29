import { chromium } from 'playwright';

async function takeScreenshot() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Log console messages
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  // Clear localStorage before loading the page
  await page.goto('http://localhost:5173');
  await page.evaluate(() => localStorage.clear());
  console.log('✅ Cleared localStorage');

  // Reload the page to use initialData
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(3000);

  // Check localStorage for saved data
  const localStorageData = await page.evaluate(() => {
    const data = localStorage.getItem('siteData');
    return data ? JSON.parse(data) : null;
  });

  console.log('\n=== LOCALSTORAGE DATA ===');
  if (localStorageData) {
    if (localStorageData.contentGrid) {
      console.log('\nContentGrid members:', localStorageData.contentGrid.members?.length);
      localStorageData.contentGrid.members?.forEach((m, i) => {
        console.log(`  ${i + 1}. ID: ${m.id}, Name: ${m.name}`);
      });
    }
    if (localStorageData.twoCardSection) {
      console.log('\nTwoCardSection cards:', localStorageData.twoCardSection.cards?.length);
      localStorageData.twoCardSection.cards?.forEach((c, i) => {
        console.log(`  ${i + 1}. ID: ${c.id}, Name: ${c.name}`);
      });
    }
  }
  console.log('========================\n');

  // Scroll to bottom to load all content
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(1000);

  // Take full page screenshot
  await page.screenshot({ path: 'screenshot-after.png', fullPage: true });

  await browser.close();
  console.log('Screenshot saved as screenshot-after.png');
}

takeScreenshot();
