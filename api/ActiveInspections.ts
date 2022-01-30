import type { Inspection } from "../types";
import { fetchNyHealth } from "./NyHealth";

const resource = "2hcc-shji"; // https://dev.socrata.com/foundry/health.data.ny.gov/2hcc-shji

export async function fetchActiveInspections(params = {}) {
  let results = await fetchNyHealth(resource, params);
  results.map((result: Inspection) => {
    // Initialize values if missing and format
    result.violations = Number(result.violations || 0);
    result.warnings = Number(result.warnings || 0);
    return result;
  });
  return results;
}
