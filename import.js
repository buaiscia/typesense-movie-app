const Typesense = require("typesense");

async function main() {
  let client = new Typesense.Client({
    apiKey: "xyz",
    nodes: [
      {
        host: "localhost",
        port: "8108",
        protocol: "http",
      },
    ],
    connectionTimeoutSeconds: 10,
  });

  let moviesSchema = {
    name: "movies5",
    fields: [
      {
        name: "title",
        type: "string",
      },
      {
        name: "img_url",
        type: "string",
        optional: true,
        facet: true
      },
      {
        name: "users_rating",
        type: "string",
        optional: true,
        facet: true
      },
      {
        name: "year",
        type: "string",
        optional: true,
        facet: true
      },
      {
        name: "genre",
        type: "string[]",
        optional: true,
        facet: true
      },
    ],
  };

  client
    .collections()
    .create(moviesSchema)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

  let fs = require("fs/promises");

  const moviesInJson = await fs.readFile("movie.jsonl", "utf8");
  // console.log(moviesInJson)
  client.collections("movies5").documents().import(moviesInJson);

  let searchParameters = {
    q: "murder",
    query_by: "title",
  };

  client
    .collections("movies5")
    .documents()
    .search(searchParameters)
    .then(function (searchResults) {
      console.log(searchResults.hits);
    })

}

main();
