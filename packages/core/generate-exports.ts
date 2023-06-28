import { readdirSync, readFileSync, writeFileSync, statSync } from "fs";
import { join } from "path";

const directoryPath = join(__dirname, "deployments", "localhost");
const abiString = readdirSync(directoryPath)
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

const allAddresses = readdirSync(join(__dirname, "deployments"));
const outputString2 = allAddresses
  .filter((e) => statSync(join(__dirname, "deployments", e)).isDirectory())
  .map((network) => {
    const directoryPath = join(__dirname, "deployments", network);

    const chainId = readFileSync(join(directoryPath, ".chainId")).toString();

    const addresses = readdirSync(directoryPath)
      .filter((e) => e.endsWith(".json"))
      .map((e) => [join(directoryPath, e), e])
      .map((e) => [
        JSON.parse(readFileSync(e[0]).toString()).address,
        e[1].replace(".json", ""),
      ])
      .reduce((acc, curr) => {
        return {
          ...acc,
          [curr[1]]: curr[0],
        };
      }, {});
    return [chainId, addresses];
  })
  .reduce((acc, curr) => {
    return {
      ...acc,
      [curr[0].toString()]: curr[1],
    };
  }, {});

const addressesString = `export const addresses = ${JSON.stringify(
  outputString2,
  undefined,
  2
)}`;
writeFileSync(
  join(__dirname, "src", "core.ts"),
  addressesString + "\n" + abiString
);
