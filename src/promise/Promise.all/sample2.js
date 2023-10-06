const axios = require('axios')

const p1 = () => axios
  .post('http://selection4test.ru:1338/graphql', {
    query: `{
      remonts(sort: "updatedAt:DESC"){
        id
        name
        updatedAt
        owners { id }
        executors { id }
      }
    }`,
  })
  .then((res) => res.data)
  .catch((err) => err);
const p2 = () => axios
  .get('http://code-samples.space/api/notes?limit=7')
  .then((res) => res.data)
  .catch((err) => err);
const p3 = () => axios
  .post('http://pravosleva.ru/api/graphql', {
    query: `{
      projects: pages(
        sort: "createdAt:DESC"
        where: { type: "project" }
      ) {
        id
        shortName
        metadata {
          shareImage { url }
          metaDescription
        }
        updatedAt
        createdAt
        type
      }
      articles: pages(
        sort: "createdAt:DESC"
        where: { type: "article" }
      ) {
        id
        shortName
        metadata {
          shareImage { url }
          metaDescription
        }
        updatedAt
        createdAt
        type
      }
    }`,
  })
  .then((res) => res.data)
  .catch((err) => err);

Promise.all([
  p1(),
  p2(),
  p3(),
])
  .then((values) => {
    console.log(values);
    // Array of fulfills (if no one rejected! else catch below)
  })
  .catch((err) => {
    console.log(err);
    // First rejection only
  });

/* expected output 1 & 2:
[
  { data: { remonts: [Array] } },
  {
    success: true,
    data: [
      [Object], [Object],
      [Object], [Object],
      [Object], [Object],
      [Object]
    ],
    pagination: { totalPages: 135, currentPage: 1, totalNotes: 945 }
  },
  { data: { projects: [Array], articles: [Array] } }
]
*/
