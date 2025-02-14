const { buildSchema } = required ('graphql');

const schema = buildSchema(`
    type User{
    id: ID!
    name: String!
    email: String!
    role: String!
    }

    type event{
    id: ID!
    title: String!
    description: String!
    date: String!
    location: String!
    online: Boolean!
    maxParticipants: Int!
    participants: [User!]!
    organizer: User!
    
    }
    type Query{
    events: [Event!]!   
    event(id: ID!): Event
    }

    type Mutation{
    createEvent(
    tittle: String!
    description: String!
    date: String!
    location: String!
    online: Boolean!
    maxParticipants: Int!
    ): Event!
}
    `);
module.exports = schema;
