const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  enum Status {
    EASY
    INTERMEDIATE
    HARD
    RETIRED
  }

  type Example {
    id: ID
    sentence: String!
    case: String
    number: Int
    dateAdded: String
  }

  type Word {
    id: ID!
    german: String!
    english: String!
    gender: String!
    pluralConst: String!
    pluralForm: String!
    theme: String
    example: [Example!]!
    status: Status
    dateAdded: String
  }

  type Query {
    words: [Word]
    word(id: ID): Word
  }
`;

const words = [
  {
    id: "1234",
    german: "Hund",
    english: "dog",
    gender: "masc",
    pluralConst: "-e",
    pluralForm: "Hunde",
    theme: "animals",
    example: [
      { sentence: "Der Hund läuft schnell", case: "nominative", number: 1 },
      { sentence: "Ich sehe den Hund", case: "nominative", number: 1 },
    ],
    dateAdded: "08-18-2021",
  },
  {
    id: "1235",
    german: "Katze",
    english: "cat",
    gender: "fem",
    pluralConst: "-en",
    pluralForm: "Katzen",
    theme: "animals",
    example: [{ sentence: "Die Katze schläft immer." }],
    dateAdded: "08-18-2021",
  },
  {
    id: "1236",
    german: "Schwein",
    english: "pig",
    gender: "neut",
    pluralConst: "-e",
    pluralForm: "Schweine",
    theme: "animals",
    example: [{ sentence: "Das Schwein ißt viel." }],
    dateAdded: "08-18-2021",
  },
];
// returns static data
const resolvers = {
  Query: {
    words: () => {
      return words;
    },
    word: (obj, { id }, context, info) => {
      const foundWord = words.find((word) =>{
        return word.id === id
      })
      return foundWord;
    },
  },
};
const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
