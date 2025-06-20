# Ramp CTF React Challenge

This project is a solution to the Ramp Capture The Flag (CTF) challenge.

## 🏁 Challenge Summary

- Parsed a provided HTML DOM to extract a hidden URL based on specific nested element patterns.
- Visited the URL to retrieve the **flag**: `delight`
- Built a React app that:
  - Makes an HTTP request to load the flag
  - Renders `"Loading..."` while fetching
  - Displays the flag using a **typewriter effect** with a 0.5s delay per character
  - Each character is rendered as a separate `<li>` list item
  - Animation runs only once

## 🚀 Live Demo

Try the working app here:  
[https://codesandbox.io/s/your-sandbox-id](https://codesandbox.io/s/your-sandbox-id)  
_(Replace with your actual CodeSandbox link)_

## 💡 Bonus: URL Parsing Script

The URL was extracted using the following Node.js script (included as a comment in the React code):

```js
const fs = require("fs");
const cheerio = require("cheerio");

const html = fs.readFileSync("challenge.html", "utf8");
const $ = cheerio.load(html);
const result = [];

$("section").each((_, section) => {
  const id = $(section).attr("data-id") || "";
  if (!id.startsWith("92")) return;

  $(section).find("article").each((_, article) => {
    const dataClass = $(article).attr("data-class") || "";
    if (!dataClass.endsWith("45")) return;

    $(article).find("div").each((_, div) => {
      const tag = $(div).attr("data-tag") || "";
      if (!tag.includes("78")) return;

      $(div).find("b.ref").each((_, b) => {
        const char = $(b).attr("value");
        if (char) result.push(char);
      });
    });
  });
});

console.log(result.join(""));
