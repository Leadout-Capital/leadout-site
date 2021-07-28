import { Handler } from "@netlify/functions";
import Airtable from "airtable";
import { FormState } from "../../src/components/Form";

const handler: Handler = async (event) => {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.DEAL_FLOW_TITLE;
    const apiKey = process.env.AIRTABLE_API_KEY;
    let data: FormState = JSON.parse(event.body);
    const base = new Airtable({ apiKey }).base(baseId);
    let record = await base(tableName).create(data);
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