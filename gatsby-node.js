const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const postTemplat = path.resolve('src/templates/blog-post.js')
  const res = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            frontmatter {
              path
              title
              date
              author
            }
          }
        }
      }
    }
  `);
  if (res.errors) {
    return Promise.reject(res.errors)
  }
  console.log('res', res);
  res.data.allMarkdownRemark.edges.forEach(({node}) => {
    createPage({
      path:node.frontmatter.path,
      component: postTemplat
    })
  })

}
