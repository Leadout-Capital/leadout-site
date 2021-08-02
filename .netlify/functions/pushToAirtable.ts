import { Handler } from "@netlify/functions";
import Airtable from "airtable";

// Modelled after types in Form.tsx
type FormData = {
  [key: string]: string | string[] | boolean | { [key: string]: { url: string } };
}

const handler: Handler = async (event) => {
  try {
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.DEAL_FLOW_TITLE;
    const apiKey = process.env.AIRTABLE_API_KEY;

    let data: FormData = JSON.parse(event.body);

    const base = new Airtable({ apiKey }).base(baseId);
    // @ts-ignore
    let record = await base(tableName).create(data);

    return {
      statusCode: 200,
      body: JSON.stringify({ recordId: record.getId() })
    };
  } catch (error) {
    return {
      statusCode: error.statusCode || 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}

export { handler };