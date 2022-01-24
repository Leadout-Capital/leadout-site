const path = require('path')
const postsPerPage = 10;

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
          title: post.title,
        },
      })
      console.log(`/blog/${post.slug}/`);
    })
  }
}

const turnCategoriesIntoPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const template = path.resolve('./src/templates/blog-category.tsx');

  const result = await graphql(
    `
      {
        allContentfulBlogCategory(
          filter: {node_locale: {eq: "en-US"}}
        ) {
        nodes {
          name
          slug
          blog_post {
            slug
          }
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

      const postCount = category.blog_post?.length || 0;
      const numPages = Math.ceil(postCount / postsPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/blog/category/${category.slug}/` : `/blog/category/${category.slug}/${i + 1}`,
          component: template,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            slug: category.slug,
            title: category.name,
          }
        })
      })
    })
  }
}

const turnAuthorsIntoPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const template = path.resolve('./src/templates/blog-author.tsx');

  const result = await graphql(
    `
      {
        allContentfulBlogAuthor(
          filter: {node_locale: {eq: "en-US"}}
        ) {
        nodes {
          name
          slug
          blog_post {
            slug
          }
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

      const postCount = author.blog_post?.length || 0;
      const numPages = Math.ceil(postCount / postsPerPage);

      Array.from({ length: numPages }).forEach((_, i) => {
        createPage({
          path: i === 0 ? `/blog/author/${author.slug}/` : `/blog/author/${author.slug}/${i + 1}`,
          component: template,
          context: {
            limit: postsPerPage,
            skip: i * postsPerPage,
            numPages,
            currentPage: i + 1,
            slug: author.slug,
            title: author.name,
          }
        })
      })
    })
  }
}

const createBlogIndexPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const template = path.resolve('./src/templates/blog-index.tsx');

  const result = await graphql(
    `
      {
        allContentfulBlogPost(
          filter: { node_locale: { eq: "en-US" }  }
        ) {
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

  const posts = result.data.allContentfulBlogPost.nodes;
  const numPages = Math.ceil(posts.length / postsPerPage);

  Array.from({ length: numPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/blog` : `/blog/${i + 1}`,
      component: template,
      context: {
        limit: postsPerPage,
        skip: i * postsPerPage,
        numPages,
        currentPage: i + 1,
        title: 'Blog',
      }
    })
  })

}

exports.createPages = async (params) => {
  await Promise.all([
    turnPostsIntoPages(params),
    turnCategoriesIntoPages(params),
    turnAuthorsIntoPages(params),
    createBlogIndexPages(params),
  ])
}
