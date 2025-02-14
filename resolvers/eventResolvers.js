const Event = require('../models/events');
const User = require('../models/user');

const resolvers = {
  Query: {
    events: async () => {
      return await Event.find().populate('organizer participants');
    },
    event: async (_, { id }) => {
      return await Event.findById(id).populate('organizer participants');
    },
  },
  Mutation: {
    createEvent: async (_, args) => {
      const event = new Event(args);
      await event.save();
      return event;
    },
  },
};

module.exports = resolvers;