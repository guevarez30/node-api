import { funcReducer } from '../utils/tools.js';

export const routeWrapper =
  ({ preHandlers, postHandlers, handler, errorHandler, DB, layers }) =>
  async (req, res) => {
    let responded = false;
    req.start = new Date();
    let state = {
      DB,
      body: req.body,
      params: req.params,
    };
    try {
      /* Validate the state of the request */
      state = await funcReducer({ funcs: preHandlers, state });
      /* Use the state of the request to perform the actual action requested */
      state = await handler(state);
      /* Return what really matters */
      res.send(state.result);
      responded = true;
      /* Do all the post stuff of the request */
      funcReducer({ funcs: postHandlers, state });
    } catch (error) {
      const response = errorHandler({ error, req, res });
      if (!responded) res.status(response.code).send(response.message);
      responded = true;
    } finally {
      res.end;
    }
  };
