import { httpRRIM } from "../config-rrim";

export async function fetchData(data) {
  try {
    const result = await httpRRIM.put(`rrim/update-status/${data}?status=4`);
    return result;
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}
