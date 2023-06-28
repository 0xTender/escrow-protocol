import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const directoryPath = join(__dirname, "deployments", "localhost");
const outputString = readdirSync(directoryPath)
  .filter((e) => e.endsWith(".json"))
  .map((e) => [join(directoryPath, e), e])
  .map((e) => [
    JSON.parse(readFileSync(e[0]).toString()).abi,
    e[1].replace(".json", ""),
  ])
  .map((e) => {
    return `export const ${e[1]}ABI = ${JSON.stringify(
      e[0],
      undefined,
      2
    )} as const`;
  })
  .reduce((acc, curr) => acc + "\n" + curr, "");

writeFileSync(join(__dirname, "src", "core.ts"), outputString);
