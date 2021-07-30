import * as React from "react";
import Form, { FormState, FieldType, FormField } from "../components/Form";
import "../stylesheets/contact.scss";
import { graphql } from "gatsby";

type QueryNode = {
  node: FormField & {
    options?: string[],
    airtableTableName?: string,
    airtableColumnName?: string
  }
}

type ContactProps = {
  data: {
    allContentfulContactFormField: {
      edges: QueryNode[]
    }
  }
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [airtableData, setAirtableData] = React.useState({});
  const formData = React.useMemo(() => (
    data.allContentfulContactFormField.edges.filter(({ node: { key }}) => key !== "DUMMY")
      .map(({ node: { options, airtableColumnName, airtableTableName, ...nodeData} }) => ({
        ...nodeData,
        options: options ? options.map((option) => ({ id: option, name: option })) : null
      }))
  ), [data]);

  const submitContactForm = (data: FormState) => {
    fetch("../../.netlify/functions/pushToAirtable", {
      method: "POST",
      body: JSON.stringify(data)
    }).then(() => console.log("Form Sent!"))
      .catch(error => console.error(error));
  };

  React.useEffect(() => {
    const getAirtableData = (requestData) => {
      fetch("../../.netlify/functions/getFromAirtable", {
        method: "POST",
        body: JSON.stringify(requestData)
      }).then(async (response) => {
        let result = await response.json();
        setAirtableData(result);
      }).catch((error) => console.error(error));
    }
    let importantData = data.allContentfulContactFormField.edges.filter(({ node: { key }}) => key !== "DUMMY").map(({ node }) => node);
    let requestData = {};
    for (let { key, type, airtableTableName, airtableColumnName } of importantData) {
      if (
        (type === FieldType.MultipleSelect || type === FieldType.SingleSelect)
        && airtableTableName
        && airtableColumnName
      ) {
        requestData[key] = { tableName: airtableTableName, columnName: airtableColumnName };
      }
    }
    getAirtableData(requestData);
  }, [data]);

  return (
    <main className={"contact"}>
      <Form
        title={"Contact Us"}
        subtitle={
          <>
            Referrals from a shared connection are best. Otherwise, contact us at&nbsp;
            <a href={"mailto:grit@leadoutcapital.com"} target={"_blank"}>grit@leadoutcapital.com</a> or submit&nbsp;
            your opportunity for investment here.
          </>
        }
        fields={formData}
        airtableData={airtableData}
        formId={"contact"}
        submit={submitContactForm}
      />
    </main>
  )
};

export default Contact;

export const query = graphql`
  {
    allContentfulContactFormField(
      filter: { node_locale: { eq: "en-US" } }
      sort: { fields: [index] }
    ) {
      edges {
        node {
          key
          title
          subtitle
          required
          type
          options
          airtableTableName
          airtableColumnName
        }
      }
    }
  }
`