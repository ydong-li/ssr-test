/**
 * 生成 css 和 js 资源内容
 */
import React from "react";
import { renderToString } from "react-dom/server";
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const template = fs.readFileSync(
  path.resolve(__dirname, "../build/index.html"),
  "utf8"
);

const $ = cheerio.load(template);

const styles = Array.from($("style")).map((it) => $(it).html());

const cssLinks = Array.from($("head link"))
  .map((item) => $(item).attr())
  .filter((item) => item.rel && item.rel === "stylesheet")
  .map((item) => item.href);

const addHost = (attrs) => {
  let obj = { ...attrs };
  if (obj.src && !/^http/.test(obj.src))
    obj.src = `http://localhost:3777${obj.src}`;
  return obj;
};
const scripts = Array.from($("script")).map((it) => ({
  attrs: addHost($(it).attr()),
  content: $(it).html(),
}));

const content = renderToString(
  <>
    {styles.map((item, idx) => (
      <style key={`style${idx}`} dangerouslySetInnerHTML={{ __html: item }} />
    ))}
    {cssLinks.map((item, idx) => (
      <link
        key={`cssLink${idx}`}
        rel="stylesheet"
        href={`http://localhost:3777${item}`}
      />
    ))}
    {scripts.map((item, idx) => (
      <script
        key={`script${idx}`}
        {...item.attrs}
        dangerouslySetInnerHTML={{ __html: item.content }}
        defer
      />
    ))}
  </>
);

fs.writeFile("cssAndJs.html", content, "utf8", (err) => {
  if (err) throw err;
  console.log("The file has been saved!");
});

export default content;
