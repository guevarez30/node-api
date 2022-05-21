import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;

import { Team } from './features/teams/teamsModel.js';

const ObjectMappings = {
  team: Team,
};

const canQuery = ({ DB, table }) => ({
  findMany: async (query) => {
    let values = await DB[table].findMany(query);
    values = values.map((obj) => {
      return Object.assign(ObjectMappings[table](obj));
    });
    return values;
  },

  findUnique: ({ where, ...query }) =>
    DB[table].findUnique({ where: parseIdInt(where), ...query }),
});

const DB_Table = ({ DB, table }) => Object.assign({}, canQuery({ DB, table }));

export function initDatabase() {
  const PRISMA = new PrismaClient({
    log: ['info', 'warn', 'error'],
  });

  const DB = {
    Team: Object.assign({}, DB_Table({ DB: PRISMA, table: 'team' })),
    User: Object.assign({}, DB_Table({ DB: PRISMA, table: 'user' })),
    Job: Object.assign({}, DB_Table({ DB: PRISMA, table: 'job' })),
  };
  return DB;
}
