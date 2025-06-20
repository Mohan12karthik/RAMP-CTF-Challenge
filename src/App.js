/**
 * Bonus: Parsing Script used to extract the URL from challenge.html
 *
 * // Node.js script using cheerio:
 * const fs = require("fs");
 * const cheerio = require("cheerio");
 *
 * const html = fs.readFileSync("challenge.html", "utf8");
 * const $ = cheerio.load(html);
 *
 * const result = [];
 *
 * $("section").each((_, section) => {
 *   const id = $(section).attr("data-id") || "";
 *   if (!id.startsWith("92")) return;
 *
 *   $(section).find("article").each((_, article) => {
 *     const dataClass = $(article).attr("data-class") || "";
 *     if (!dataClass.endsWith("45")) return;
 *
 *     $(article).find("div").each((_, div) => {
 *       const tag = $(div).attr("data-tag") || "";
 *       if (!tag.includes("78")) return;
 *
 *       $(div).find("b.ref").each((_, b) => {
 *         const char = $(b).attr("value");
 *         if (char) result.push(char);
 *       });
 *     });
 *   });
 * });
 *
 * console.log(result.join("")); // prints the hidden URL
 */

import { useEffect, useState } from "react";

export default function App() {
  const [flag, setFlag] = useState("");
  const [displayedChars, setDisplayedChars] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/64656c"
    )
      .then((res) => res.text())
      .then((text) => {
        setFlag(text.trim());
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!loading && flag) {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayedChars((prev) => [...prev, flag[i]]);
        i++;
        if (i >= flag.length) clearInterval(interval);
      }, 500);

      return () => clearInterval(interval);
    }
  }, [loading, flag]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {displayedChars.map((char, index) => (
        <li key={index}>{char}</li>
      ))}
    </ul>
  );
}
