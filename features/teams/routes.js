import * as teamsController from './teams.js';
import { methods } from '../../utils/methods.js';
import { routeError } from '../../utils/error.js';

export const routes = [
  {
    authProtected: false,
    route: '/teams',
    method: methods.GET,
    preHandlers: [],
    handler: teamsController.list,
    postHandlers: [],
    errorHandler: routeError,
  },
  {
    authProtected: false,
    route: '/failure',
    method: methods.GET,
    preHandlers: [],
    handler: teamsController.failure,
    postHandlers: [],
    errorHandler: routeError,
  },
  {
    authProtected: false,
    route: '/notFound',
    method: methods.GET,
    preHandlers: [],
    handler: teamsController.notFound,
    postHandlers: [],
    errorHandler: routeError,
  },
];
