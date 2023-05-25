import { initialState } from "./initialState";
import { LOADER_END, LOADER_START } from "./loaderTypes";

const LoaderReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOADER_START:
      return 100;

    case LOADER_END:
      return 0;

    default:
      return state;
  }
};

export default LoaderReducer;
