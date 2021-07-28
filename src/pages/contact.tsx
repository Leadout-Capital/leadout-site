import * as React from "react";
import Form, { FormState } from "../components/Form";
import ContactFormFields from "../constants/ContactFormFields";
import "../stylesheets/contact.scss";
import { graphql } from "gatsby";

type QueryNode = {
  node: {
    data: {
      Name: string
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
  const categories = React.useMemo<string[]>(() => {
    let raw = data.allAirtable.edges.map(({ node }) => node.data.Name);
    return [...new Set(raw)].sort();
  }, [data]);

  const submitContactForm = (data: FormState) => {
    console.log(data);
  }

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
          }
        }
      }
    }
  }
`