import { createContext, useContext, useReducer } from "react";

export const PageTitleContext = createContext({});

export const actionTypes = {
  SET_PAGE_TITLE: "SET_PAGE_TITLE",
};

const initialState = {
  pageTitle: "Page",
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.SET_PAGE_TITLE:
      return { ...state, pageTitle: payload };
    default:
      return state;
  }
};

export const usePageTitleActions = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    handleChangePageTitle: (title) => {
      dispatch({
        type: actionTypes.SET_PAGE_TITLE,
        payload: title,
      });
    },
  };
};

export const PageTitleProvider = ({ children }) => {
  const actions = usePageTitleActions();

  return (
    <PageTitleContext.Provider value={{ ...actions }}>
      {children}
    </PageTitleContext.Provider>
  );
};

export const usePageTitleStore = () => useContext(PageTitleContext);
