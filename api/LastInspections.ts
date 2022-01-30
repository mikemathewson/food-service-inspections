import { Facility } from "../types";
import { fetchNyHealth } from "./NyHealth";

const resource = "cnih-y5dw"; // https://dev.socrata.com/foundry/health.data.ny.gov/cnih-y5dw

export async function fetchLatestInspections(params = {}) {
  let results = await fetchNyHealth(resource, params);
  results.map((result: Facility) => {
    // Initialize values if missing and format
    result.violations = Number(result.violations || 0);
    result.warnings = Number(result.warnings || 0);
    return result;
  });
  return results;
}
