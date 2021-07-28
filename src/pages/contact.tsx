import * as React from "react";
import Form, { FormState, DropdownData } from "../components/Form";
import ContactFormFields from "../constants/ContactFormFields";
import "../stylesheets/contact.scss";
import { graphql } from "gatsby";

type QueryNode = {
  node: {
    data: {
      Name: string,
      ID: string
    }
  }
}

type ContactProps = {
  data: {
    allAirtable: {
      edges: QueryNode[]
    }
  }
}

const Contact: React.FC<ContactProps> = ({ data }) => {
  // Isolate Name field in data, remove duplicates, and sort alphabetically
  const categories = React.useMemo<DropdownData[]>(() => (
    data.allAirtable.edges.map(({ node }) => ({
      id: node.data.ID,
      name: node.data.Name
    })).sort((rec1, rec2) => {
      let rec1Name = rec1.name.toUpperCase();
      let rec2Name = rec2.name.toUpperCase();
      if (rec1Name < rec2Name) {
        return -1;
      } else if (rec1Name > rec2Name) {
        return 1;
      } else {
        return 0
      }
    })
  ), [data]);

  const submitContactForm = (data: FormState) => {
    fetch("../../.netlify/functions/airtable", {
      method: "POST",
      body: JSON.stringify(data)
    })
      .then(() => console.log("Form Sent!"))
      .catch(error => console.error(error));
  };

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
        fields={ContactFormFields(categories)}
        formId={"contact"}
        submit={submitContactForm}
      />
    </main>
  )
};

export default Contact;

export const query = graphql`
  query {
    allAirtable(
      filter: {
        table: { eq: "Deal Flow Category" }
        data: { Name: { ne: null } }
      }
    ) {
      edges {
        node {
          data {
            Name
            ID
          }
        }
      }
    }
  }
`