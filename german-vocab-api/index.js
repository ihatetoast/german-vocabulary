const { ApolloServer, gql } = require("apollo-server");
// const { GraphQLScalarType } = require("graphql");
// const { Kind } = require("graphql/language");

const typeDefs = gql`
  enum Status {
    EASY
    INTERMEDIATE
    HARD
    RETIRED
    UNKNOWN
  }

  type Example {
    id: ID!
    sentence: String
  }
  type Theme {
    id: ID!
    genre: String
  }
  type Word {
    id: ID!
    german: String!
    english: String!
    gender: String!
    pluralConst: String!
    pluralForm: String!
    theme: [Theme]
    example: [Example] # Valid: null, [], [...some data]. what is not valid: [...some data without name or id]
    #example: [Example]! Valid: [], [...some data]
    # example: [Example!]! Valid: [...some data]
    status: Status
    dateAdded: String
  }
# type ID is always str
  type Query {
    words: [Word]
    word(id: ID): Word
  }
`;
const themes = [
  {
    id:"animals1",
    genre: 'mammals'
  },
  {
    id:"animals2",
    genre: 'pets'
  },
  {
    id:"animals3",
    genre: 'fish'
  },
  {
    id:"animals4",
    genre: 'birds'
  },
  {
    id:"animals5",
    genre: 'reptiles & amphibians'
  },
  ,
  {
    id:"animals6",
    genre: 'invertebrates'
  }
]
const examples = [
  {
    id: "hund1",
    sentence: "Der Hund läuft schnell",
  },
  {
    id: "hund2",
    sentence: "Ich sehe den Hund",
  },
  {
    id: "schwein1",
    sentence: "Das Schwein ißt viel.",
  },
  {
    id: "katze1",
    sentence: "Die Katze schläft immer.",
  },
];
const words = [
  {
    id: "1234",
    german: "Hund",
    english: "dog",
    gender: "masc",
    pluralConst: "-e",
    pluralForm: "Hunde",
    theme: "animals",
    example: [{ id: "hund1" }, { id: "hund2" }],
    dateAdded: new Date("8-18-2021"),
  },
  {
    id: "1235",
    german: "Katze",
    english: "cat",
    gender: "fem",
    pluralConst: "-en",
    pluralForm: "Katzen",
    theme: "animals",
    example: [{ id: "katze1" }],
    dateAdded: new Date("10-12-1983"),
  },
  {
    id: "1236",
    german: "Schwein",
    english: "pig",
    gender: "neut",
    pluralConst: "-e",
    pluralForm: "Schweine",
    theme: "animals",
    example: [{ id: "Schwein1" }],
    dateAdded: "08-18-2021",
  },
];

// returns static data
const resolvers = {
  Query: {
    words: () => {
      return words;
    },
    word: (obj, { id }, context, info) =>{
      const foundWord = words.find(word => {
        return word.id === id
      })
      return foundWord
    }
  },
};
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
