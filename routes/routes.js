import { routeWrapper } from '../utils/routeWrapper.js';
import { methods } from '../utils/methods.js';

/* Import Feature Routes */
import * as teamRoutes from '../features/teams/routes.js';

const createRoutes =
  ({ DB, app, layers }) =>
  (newRoute) => {
    const { route, method, authProtected, ...handlers } = newRoute;
    const state = Object.assign({}, handlers, { DB: DB, layers });
    switch (method) {
      case methods.GET:
        app.get(route, routeWrapper(state));
        break;
      case methods.PUT:
        app.put(route, routeWrapper(state));
        break;
      case methods.POST:
        app.post(route, routeWrapper(state));
        break;
      case methods.DELETE:
        app.delete(route, routeWrapper(state));
        break;
      default:
    }
  };

export function initRoutes({ DB, app }) {
  const newRoute = createRoutes({ DB, app });
  const routes = [].concat(teamRoutes.routes);
  routes.forEach(newRoute);
}
