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

const turnPostsIntoPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPost = path.resolve('./src/templates/blog-post.tsx')

  const result = await graphql(
    `
      {
        allContentfulBlogPost(filter: {node_locale: {eq: "en-US"}}) {
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

const turnCategoriesIntoPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const template = path.resolve('./src/templates/blog-list-template.tsx');

  const result = await graphql(
    `
      {
        allContentfulBlogCategory(filter: {node_locale: {eq: "en-US"}}) {
          nodes {
            name
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful categories`,
      result.errors
    )
    return
  }

  const categories = result.data.allContentfulBlogCategory.nodes

  if (categories.length > 0) {
    categories.forEach((category, index) => {
      createPage({
        path: `/blog/category/${category.slug}/`,
        component: template,
        context: {
          slug: category.slug,
        },
      })
      console.log(`/blog/category/${category.slug}/`);
    })
  }
}

const turnAuthorsIntoPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const template = path.resolve('./src/templates/blog-list-template.tsx');

  const result = await graphql(
    `
      {
        allContentfulBlogAuthor(filter: {node_locale: {eq: "en-US"}}) {
          nodes {
            name
            slug
          }
        }
      }
    `
  )

  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful authors`,
      result.errors
    )
    return
  }

  const authors = result.data.allContentfulBlogAuthor.nodes

  if (authors.length > 0) {
    authors.forEach((author, index) => {
      createPage({
        path: `/blog/author/${author.slug}/`,
        component: template,
        context: {
          slug: author.slug,
        },
      })
      console.log(`/blog/author/${author.slug}/`);
    })
  }
}

exports.createPages = async (params) => {
  await Promise.all([
    turnPostsIntoPages(params),
    turnCategoriesIntoPages(params),
    turnAuthorsIntoPages(params),
  ])
}
