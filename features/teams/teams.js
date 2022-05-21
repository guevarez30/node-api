import Response from '../../classes/response.js';

export async function list(state) {
  const [team] = await state.DB.Team.findMany({});
  team.rename('My New Name');
  state.result = team;
  return state;
}

export async function failure(state) {
  /* Throw an error at any point and let it be handled by route wrapper */
  throw 'Banana';
}

export async function notFound(state) {
  /* Throw a specifc response and let it be handled by route wrapper */
  throw Response.notFound('Custom Message');
}
