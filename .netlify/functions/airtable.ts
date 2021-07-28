import { Handler } from "@netlify/functions";
import Airtable from "airtable";

const handler: Handler = async (event) => {
  try {
    const baseId = process.env.GATSBY_AIRTABLE_BASE_ID;
    const tableName = process.env.GATSBY_DEAL_FLOW_TITLE;
    const base = new Airtable({ apiKey: process.env.AIRTABLE_API }).base(baseId);
    let record = await base(tableName).create(event.body);
    return {
      statusCode: 200,
      body: JSON.stringify(record.getId())
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}

export { handler };