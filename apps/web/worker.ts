/* eslint-disable */
import { MigrationEventTypes, MigrationListener } from "@0xtender/evm-helpers";
import { existsSync } from "fs";
import { join } from "path";

const listener = new MigrationListener<MigrationEventTypes>();

let count = 0;
listener.on("event_data", async (...data) => {
  for (let index = 0; index < data.length; index++) {
    const events = data[index]!;
    for (let index = 0; index < events.length; index++) {
      const event = events[index];
      if (event?.event_changed_name === "e_StructEvent_Hello") {
        count++;
        console.log(count);
      }
    }
  }
});

const run_worker = async () => {
  // async import to skip build errors
  /// init for older data
  if (existsSync(join(__dirname, "./migration.ts"))) {
    const migrationPath = "./migration";
    const { migrate } = await import(`${migrationPath}`);
    await migrate(listener);
  } else {
    console.log(`Exiting: no migration file generated`);
  }
};

run_worker().catch(console.error);
