import { compareTwoStrings, findBestMatch } from "string-similarity";

var similarity = compareTwoStrings("这么好使么", "这不好使么");

var matches = findBestMatch("这么好使么", [
  "这不好使么",
  "这不好使呀",
  "这么好使呀",
]);

console.log(similarity, matches)