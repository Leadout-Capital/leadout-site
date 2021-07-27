import * as React from "react";
import Form from "../components/Form";
import ContactFormFields from "../constants/ContactFormFields";
import "../stylesheets/contact.scss";
// import { graphql } from "gatsby";

const Contact = () => {
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
        fields={ContactFormFields}
        formId={"contact"}
        submit={(data) => console.log(data)}
      />
    </main>
  )
};

export default Contact;

// export const query = graphql`
//   query {
//     allAirtable(
//
//     )
//   }
// `