# Phone Scraper Chrome Extension

A lightweight Chrome extension that scrapes phone numbers from elements with a class ( e.g., `._ao3e` for WhatsApp phone numbers)

## Features
- Select country code (+55, +52, +57, etc.)
- **Scrape & Count** — see how many numbers found without downloading
- **Download List** — download only when ready
- No auto-download
- Removes duplicates
- Works on any page with `._ao3e` elements

## How to Install
1. Download or clone this repository
2. Open Chrome → `chrome://extensions`
3. Enable **Developer mode** (top right)
4. Click **"Load unpacked"**
5. Select this folder
   
## Changes
Could you adjust the following depending on the site you are scraping? 

In <code>popup.js</code> - For WhatsApp (._ao3e): 
```
  const elements = document.querySelectorAll("._ao3e");
```


In <code>popup.html</code> - add as many **country codes** as you want:

  ```
   <select id="countryCode">
      <option value="+55">Brazil (+55)</option>
      <option value="+52">Mexico (+52)</option>
      .
      .
      .
      <option value="+58">Venezuela (+58)</option>
  </select>
```




## Usage
1. Go to a page with phone numbers (usually in `._ao3e` elements)
2. Click the extension icon
3. Choose country code
4. Click **"Scrape & Count"**
5. If numbers found → click **"Download List"**

## Acknowledgment 
This project is inspired by this code <p dir="auto"><a href="https://github.com/redianmarku/whatsapp-phone-number-scraper" rel="nofollow">Whatsapp Phone Number Scrapper</a></p>

