const { buildSchema } = require('graphql');

const schema = buildSchema(`
    type User {
        id: ID!
        name: String!
        email: String!
        role: String!
    }

    type Event {  # Aqui estava "event", agora está com "E" maiúsculo
        id: ID!
        title: String!  # Corrigido "tittle" para "title"
        description: String!
        date: String!
        location: String!
        online: Boolean!
        maxParticipants: Int!
        participants: [User!]!
        organizer: User!
    }

    type Query {
        events: [Event!]!   
        event(id: ID!): Event
    }

    type Mutation {
        createEvent(
            title: String!  # Corrigido "tittle" para "title"
            description: String!
            date: String!
            location: String!
            online: Boolean!
            maxParticipants: Int!
        ): Event!
    }
`);

module.exports = schema;
