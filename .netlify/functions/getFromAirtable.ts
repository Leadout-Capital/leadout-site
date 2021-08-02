import { Handler } from "@netlify/functions";
import Airtable from "airtable";

type AirtableRequest = {
  tableName: string,
  columnName: string
};

type EventBody = {
  [key: string]: AirtableRequest
}

const handler: Handler = async (event) => {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const apiKey = process.env.AIRTABLE_API_KEY;
    const base = new Airtable({ apiKey }).base(baseId);

    let requests: EventBody = JSON.parse(event.body);
    let result = {};

    console.log("here");

    for (let key of Object.keys(requests)) {
      let { tableName, columnName } = requests[key]
      await base(tableName).select({ fields: [columnName] }).eachPage((records, fetchNextPage) => {
        result[key] = [];
        for (let record of records) {
          let cellContent = record.get(columnName);
          let recordId = record.getId();
          result[key].push({ id: recordId, name: cellContent });
        }
        fetchNextPage();
      });
    }

    return {
      statusCode: 200,
      body: JSON.stringify(result)
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}

export { handler };