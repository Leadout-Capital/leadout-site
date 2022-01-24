const path = require('path')

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
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.tsx')

  const result = await graphql(
    `
      {
        allContentfulBlogPost {
          nodes {
            title
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulBlogPost.nodes

// Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: `/blog/${post.slug}/`,
        component: blogPost,
        context: {
          slug: post.slug,
        },
      })
      console.log(`/blog/${post.slug}/`);
    })
  }
}
