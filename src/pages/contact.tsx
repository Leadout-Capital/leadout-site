import * as React from "react";
import Form, { FormState, FieldType, FormField, StatusMessageData } from "../components/Form";
import "../stylesheets/contact.scss";
import { graphql } from "gatsby";
import * as filestack from "filestack-js";
import { UseFormReset } from "react-hook-form";
import { Widget } from "@typeform/embed-react";

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

// const uploadFile = async (file, apiKey, timestamp, signature) => {
//   const url = `https://api.cloudinary.com/v1_1/${process.env.GATSBY_CLOUDINARY_CLOUD_NAME}/upload`;
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("api_key", apiKey);
//   formData.append("timestamp", timestamp);
//   formData.append("signature", signature);
//   let cloudinaryResponse = await fetch(url, {
//     method: "POST",
//     body: formData
//   });
//   return await cloudinaryResponse.json();
// }
//
// const uploadToCloudinary = async (data, fields) => {
//   const apiKey = process.env.GATSBY_CLOUDINARY_API_KEY;
//   const fileFields = fields.filter(({ type }) => type === FieldType.File);
//   const fileData = fileFields.map(({ key }) => ({ key, files: Array.from(data[key]) }));
//
//   let sigResponse = await fetch("../../.netlify/functions/pushToCloudinary", { method: "POST" });
//   let { timestamp, signature } = await sigResponse.json();
//
//   let publicUrls = {};
//   for (let { key, files } of fileData) {
//     publicUrls[key] = [];
//     for (let file of files) {
//       try {
//         let { secure_url: fileUrl } = await uploadFile(file, apiKey, timestamp, signature);
//         if (fileUrl) {
//           publicUrls[key].push(fileUrl);
//         }
//       } catch (e) {
//         console.error(e);
//       }
//     }
//   }
//   return publicUrls;
// };

const uploadToFilestack = async (data, fields) => {
  const apiKey = process.env.GATSBY_FILESTACK_API_KEY;
  const fileFields = fields.filter(({ type }) => type === FieldType.File);
  const fileData = fileFields.map(({ key }) => ({ key, files: Array.from(data[key]) }));

  const client = filestack.init(apiKey);
  let dataWithUrls = { ...data };
  for (let { key, files } of fileData) {
    dataWithUrls[key] = [];
    for (let file of files) {
      try {
        let { url } = await client.upload(file, {},{ filename: file.name });
        dataWithUrls[key].push({ url, filename: file.name });
      } catch (e) {
        console.error(e);
      }
    }
  }
  return dataWithUrls;
};

const Contact: React.FC<ContactProps> = ({ data }) => {
  const [airtableData, setAirtableData] = React.useState({});
  const formData = React.useMemo(() => (
    data.contactFormFields.edges
      .map(({ node: { options, airtableColumnName, airtableTableName, ...nodeData} }) => ({
        airtableColumnName,
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
      cleanedData[fieldsMap[cleanKey].airtableColumnName || cleanKey] = fieldData;
    }
    return cleanedData;
  }

  const submitContactForm = async (data: FormState, stopLoading: () => void, setStatusMessage: (status: StatusMessageData) => void, reset: UseFormReset<FormState>) => {
    try {
      const cleanedData = cleanFormData(data, formData);
      let dataWithUrls = await uploadToFilestack(cleanedData, formData);
      await fetch("../../.netlify/functions/pushToAirtable", {
        method: "POST",
        body: JSON.stringify(dataWithUrls)
      });
      setStatusMessage({ message: "Form sent successfully!", isError: false });
      reset();
    } catch (error) {
      console.error(error);
      setStatusMessage({ message: error.message, isError: true });
    } finally {
      stopLoading();
    }
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
      {/* <Form
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
      /> */}
      <div className={"form-header"}>
        <h1>Contact Us</h1>
        <h2>Referrals from a shared connection are best. Otherwise, please submit your opportunity for investment here.</h2>
      </div>
      <Widget id="dsCOVpbh" className="typeform-form" />
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
