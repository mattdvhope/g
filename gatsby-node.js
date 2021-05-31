var path = require("path");

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    const blogPostTemplate = path.resolve("src/templates/blog-post.js");
    resolve(
      graphql(`
        {
          allContentfulBlogs(limit: 150) {
            edges {
              node {
                id
                slug
                promptsForResponse {
                  promptSlug
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          reject(result.errors);
        }

console.log(result.data.allContentfulBlogs.edges)

        // result.data.allContentfulBlogs.edges.forEach(edge => {
        //   createPage({
        //     path: edge.node.slug,
        //     component: blogPostTemplate,
        //     context: {
        //       slug: edge.node.slug
        //     }
        //   });
        // });

        result.data.allContentfulBlogs.edges.forEach(edge => {
          edge.node.promptsForResponse.forEach(prompt => {
            createPage({
              path: edge.node.slug + "/" + prompt.promptSlug,
              component: blogPostTemplate,
              context: {
                slug: edge.node.slug
              }
            });
          })
        });



        return;
      })
    );
  });
};
