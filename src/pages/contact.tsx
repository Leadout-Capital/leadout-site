import * as React from "react";
import Form, { FormState, FieldType, FormField } from "../components/Form";
import "../stylesheets/contact.scss";
import { graphql } from "gatsby";

type ContactProps = {
  data: {
    contactFormFields: {
      edges: QueryNode<ContentfulContactFormField>[]
    },
    contactFormTitle: ContentfulTextField,
    contactFormSubtitle: ContentfulTextField
  }
}

const ID = "contact";

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [airtableData, setAirtableData] = React.useState({});
  const formData = React.useMemo(() => (
    data.contactFormFields.edges
      .map(({ node: { options, airtableColumnName, airtableTableName, ...nodeData} }) => ({
        ...nodeData,
        options: options ? options.map((option) => ({ id: option, name: option })) : null
      }))
  ), [data]);

  const getFieldObj = (fields: FormField[]) => {
    let fieldObj = {};
    for (let { key, ...field } of fields) {
      fieldObj[key] = field;
    }
    return fieldObj;
  }

  const cleanFormData = (data: FormState, fields: FormField[]) => {
    let fieldsMap = getFieldObj(fields);
    let cleanedData = {};
    for (let key of Object.keys(data)) {
      let fieldData: string | string[] | boolean | null | [{ url: string }] = data[key];
      // Remove form ID (`contact-`) from key
      let cleanKey = key.substr(ID.length + 1);
      // Take out edge case where MultipleSelect field is sometimes `false`
      if (fieldsMap[cleanKey].type === FieldType.MultipleSelect && !Array.isArray(fieldData)) {
        fieldData = [];
      } else if (fieldsMap[cleanKey].type === FieldType.File && typeof fieldData === "string" && fieldData.length > 0) {
        fieldData = [{ url: fieldData }];
      }
      cleanedData[cleanKey] = fieldData;
    }
    return cleanedData;
  }

  const submitContactForm = (data: FormState) => {
    cleanFormData(data, formData);
    fetch("../../.netlify/functions/pushToAirtable", {
      method: "POST",
      body: JSON.stringify(cleanFormData(data, formData))
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
    let importantData = data.contactFormFields.edges.map(({ node }) => node);
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
        formId={ID}
        submit={submitContactForm}
      />
    </main>
  )
};

export default Contact;

export const query = graphql`
  query {
    contactFormFields: allContentfulContactFormField(
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
    contactFormTitle: contentfulTextField(name: { eq: "Contact Form Title" }) {
      body {
        childMarkdownRemark {
          html
        }
      }
    }
    contactFormSubtitle: contentfulTextField(name: { eq: "Contact Form Subtitle" }) {
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;