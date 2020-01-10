import React from "react";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";

function renderWithProviders(
  ui,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
    mocks = [],
    cache = null,
    withRoute = null
  } = {}
) {
  const Wrapper = ({ children }) => (
    <MockedProvider addTypename={false} mocks={mocks} cache={cache}>
      <Router history={history}>
        {!withRoute ? children : <Route path={withRoute}>{children}</Route>}
      </Router>
    </MockedProvider>
  );
  return {
    ...render(ui, { wrapper: Wrapper }),
    history
  };
}

export { renderWithProviders };
