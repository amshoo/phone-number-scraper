
let currentPhoneList = [];  // Store numbers after scraping

document.getElementById("scrapeBtn").addEventListener("click", async () => {
    const countryCode = document.getElementById("countryCode").value;

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab?.id) return alert("No active tab");

        const results = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: scrapePhones,
            args: [countryCode]
        });

        const count = results[0].result.count;
        currentPhoneList = results[0].result.list;

        document.getElementById("foundCount").textContent = count;

        const downloadBtn = document.getElementById("downloadBtn");
        if (count > 0) {
            downloadBtn.classList.add("visible");
            downloadBtn.textContent = `Download List (${count} numbers)`;
        } else {
            downloadBtn.classList.remove("visible");
            alert(`No numbers with ${countryCode} found.`);
        }

    } catch (err) {
        alert("Error: " + err.message);
    }
});

document.getElementById("downloadBtn").addEventListener("click", () => {
    if (currentPhoneList.length === 0) return;

    const country = document.getElementById("countryCode").value;
    const blob = new Blob([currentPhoneList.join("\n")], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${country.replace("+", "")}_phones_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    alert(`Downloaded ${currentPhoneList.length} numbers!`);
});

// Runs in page context
function scrapePhones(countryCode) {
    const elements = document.querySelectorAll("._ao3e");
    const texts = [...elements].map(el => el.textContent.trim()).filter(Boolean);

    if (texts.length === 0) {
        alert("No elements with class '_ao3e' found.");
        return { count: 0, list: [] };
    }

    const phones = texts
        .join("\n")
        .split(/[\n,]+/)
        .map(l => l.trim())
        .filter(l => l.includes(countryCode) && l.length > 10);

    const unique = [...new Set(phones)];

    return { count: unique.length, list: unique };
}