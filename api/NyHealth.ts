const endpoint = "https://health.data.ny.gov/resource";

type Params = {
  [key: string]: string;
};

export async function fetchNyHealth(resource: string, params: Params = {}) {
  for (const key in params) {
    if (params[key] === undefined) {
      delete params[key];
    }
  }

  let urlParams = new URLSearchParams(params);
  let url = `${endpoint}/${resource}.json?${urlParams}`;
  let response = await fetch(url);
  let json = await response.json();

  if (response.status !== 200) {
    return [];
  }

  return json;
}
