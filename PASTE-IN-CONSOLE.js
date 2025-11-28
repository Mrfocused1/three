// ============================================
// PASTE THIS ENTIRE SCRIPT IN BROWSER CONSOLE
// ============================================
// 1. Go to your website: http://localhost:5173
// 2. Press F12 or Cmd+Option+I to open Developer Console
// 3. Click on "Console" tab
// 4. Paste this entire script and press Enter
// ============================================

(async function restoreData() {
  console.log('%c🚀 Starting Data Restoration...', 'color: #2563eb; font-size: 16px; font-weight: bold');

  const correctedData = {
    "hero": {
      "tagline": "Premium production studio partnering with creators, influencers, and streamers to deliver exceptional live and pre-recorded content",
      "mainImage": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/hero%20image.jpg?raw=true",
      "socialIcons": {
        "tiktok": "",
        "twitter": "",
        "youtube": "",
        "facebook": "",
        "snapchat": "",
        "instagram": ""
      }
    },
    "heroCards": [
      {
        "id": "work",
        "type": "work-card",
        "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761911772237-lcg3g.png",
        "title": "WORK WITH US"
      },
      {
        "id": "contact",
        "type": "touch-card",
        "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761912173012-irbcq.png",
        "title": "GET IN TOUCH"
      },
      {
        "id": "studio",
        "type": "clothing-card",
        "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761912173012-irbcq.png",
        "title": "BOOK OUR STUDIO"
      }
    ],
    "contentGrid": {
      "videoUrl": "https://www.youtube.com/embed/8oi2OcFeEew",
      "members": [
        {
          "id": 1,
          "name": "Zeze Millz",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618039352-mj6p29.jpeg",
          "socials": {"twitch": "", "twitter": "", "youtube": "", "instagram": ""},
          "description": "Content creator and influencer known for engaging content and unique personality."
        },
        {
          "id": 2,
          "name": "Rimzee",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618051711-hhrw9p.jpeg",
          "socials": {"twitter": "", "youtube": "", "facebook": "", "instagram": ""},
          "description": "Multi-talented artist bringing fresh energy to the creative scene."
        },
        {
          "id": 3,
          "name": "Layos Choice",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618062282-pyls2.jpeg",
          "socials": {"youtube": "", "instagram": ""},
          "special": true,
          "description": "Creative visionary pushing boundaries in content and entertainment."
        },
        {
          "id": 4,
          "name": "Maggie Mayhem",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618076115-r42t8r.jpeg",
          "socials": {"twitter": "", "youtube": "", "instagram": ""},
          "description": "Dynamic personality known for authentic content and engaging storytelling."
        },
        {
          "id": 5,
          "name": "Paul Bridges",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618156593-mytj1k.jpeg",
          "socials": {"twitter": "", "youtube": "", "instagram": ""},
          "description": "Creative professional bringing innovation and expertise to every project."
        },
        {
          "id": 6,
          "name": "Bugzy Malone",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618088901-b64cvq.jpeg",
          "socials": {"youtube": "", "instagram": ""},
          "description": "Award-winning artist and influential voice in music and entertainment."
        },
        {
          "id": 7,
          "name": "Bernicia Boateng",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618101674-xzsot.jpeg",
          "socials": {"twitter": "", "youtube": "", "instagram": ""},
          "description": "Creative talent known for impactful content and inspiring storytelling."
        },
        {
          "id": 8,
          "name": "JenyBSG",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618110670-krdp6o.jpeg",
          "socials": {"twitter": "", "youtube": "", "instagram": ""},
          "description": "Digital creator bringing fresh perspectives and engaging content."
        },
        {
          "id": 9,
          "name": "Breeny Lee",
          "image": "https://gxiqydbsvtirytqyzavj.supabase.co/storage/v1/object/public/images/1761618123256-pq4z.jpeg",
          "socials": {"twitter": "", "youtube": "", "instagram": ""},
          "description": "Content creator and entertainer known for unique style and authenticity."
        }
      ]
    },
    "twoCardSection": {
      "cards": [
        {
          "id": "card7",
          "name": "HARRY",
          "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-36.jpg?raw=true",
          "socials": {"twitter": "", "youtube": "", "instagram": ""},
          "description": "Harry brings humor and creativity to the Sidemen with his unique content style and entertaining videos."
        },
        {
          "id": "card8",
          "name": "JJ",
          "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%208.jpg?raw=true",
          "socials": {"twitch": "", "twitter": "", "youtube": "", "instagram": ""},
          "description": "JJ is a founding member of the Sidemen, known for his music career and entertaining content."
        }
      ]
    },
    "channels": [
      {"id": "channel1", "name": "SIDEMEN", "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-33.jpg?raw=true", "subtitle": "XIX", "youtubeUrl": ""},
      {"id": "channel2", "name": "SIDEMEN", "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/Image_fx-35.jpg?raw=true", "subtitle": "Reacts", "youtubeUrl": ""},
      {"id": "channel3", "name": "More SIDEMEN", "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/man.jpg?raw=true", "subtitle": "XIX", "youtubeUrl": ""},
      {"id": "channel4", "name": "SIDEMEN", "image": "https://github.com/Mrfocused1/trimline-barbershop/blob/main/card%204.jpg?raw=true", "subtitle": "Shorts", "youtubeUrl": ""}
    ]
  };

  try {
    // Save to localStorage
    console.log('%c💾 Saving to localStorage...', 'color: #10b981; font-size: 14px');
    localStorage.setItem('siteData', JSON.stringify(correctedData));
    console.log('%c✓ Saved to localStorage!', 'color: #10b981; font-size: 14px');

    // Import Supabase
    const { createClient } = await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');

    const SUPABASE_URL = 'https://gxiqydbsvtirytqyzavj.supabase.co';
    const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4aXF5ZGJzdnRpcnl0cXl6YXZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1OTQyNTcsImV4cCI6MjA3NzE3MDI1N30.PQ3iv18d2BR_5RrFcc72pgnD1jf_hhUhbfTujuJoXMI';

    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

    // Save to Supabase
    console.log('%c☁️ Saving to Supabase...', 'color: #2563eb; font-size: 14px');
    const { error } = await supabase
      .from('site_data')
      .upsert({ id: 'main', data: correctedData });

    if (error) {
      console.warn('%c⚠️ Supabase warning:', 'color: #f59e0b; font-size: 14px', error.message);
      console.log('%c✓ Data saved to localStorage (Supabase had issues)', 'color: #f59e0b; font-size: 14px');
    } else {
      console.log('%c✓ Saved to Supabase!', 'color: #10b981; font-size: 14px');
    }

    console.log('%c\n🎉 SUCCESS! All your images have been restored!', 'color: #10b981; font-size: 18px; font-weight: bold');
    console.log('%c→ 3 hero card images', 'color: #666; font-size: 14px');
    console.log('%c→ 9 team member images', 'color: #666; font-size: 14px');
    console.log('%c→ 12 total images restored', 'color: #666; font-size: 14px');
    console.log('%c\n📌 Now refresh the page to see your images!', 'color: #2563eb; font-size: 16px; font-weight: bold');

  } catch (error) {
    console.error('%c❌ Error:', 'color: #ef4444; font-size: 14px; font-weight: bold', error.message);
    console.log('%cTry refreshing and running the script again.', 'color: #666; font-size: 12px');
  }
})();
