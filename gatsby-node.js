exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  // Only need to define optional fields
  const typeDefs = `
    type ContentfulContactFormField implements Node {
      subtitle: String
      options: [String!]
      airtableTableName: String,
      airtableColumnName: String
    }
    type ContentfulHomepageSection implements Node {
      overlay: String
    }
    type ContentfulFooter implements Node {
      twitter: String
      linkedIn: String
      medium: String
      email: String
    }
  `
  createTypes(typeDefs)
}