const tableWithName = (state) => ({
  rename: (newName) => (state.name = newName),
});

export function Team(team) {
  return Object.assign(team, tableWithName(team));
}
