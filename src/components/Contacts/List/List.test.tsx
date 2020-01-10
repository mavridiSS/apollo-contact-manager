import React from "react";
import { fireEvent } from "@testing-library/react";
import ContactsList from "./List";
import { CONTACTS_LIST } from "../../../const/queries";
import wait from "waait";
import { GraphQLError } from "graphql";
import { renderWithProviders } from "../../../test-utils";
import { mocks, contact } from "../../../test-utils/mockData";

const addRoute = "/contacts/add";

const mocks1 = [
  {
    request: {
      query: CONTACTS_LIST
    },
    result: {
      error: new GraphQLError("Error!")
    }
  }
];

test("it renders contacts list without error", () => {
  renderWithProviders(<ContactsList />, {
    mocks
  });
});

test("it renders spinner", () => {
  const { queryByTestId } = renderWithProviders(<ContactsList />, {
    mocks
  });

  expect(queryByTestId("spinner")).not.toEqual(null);
});

test("it renders results and hides spinner", async () => {
  const { queryByTestId, queryByText } = renderWithProviders(<ContactsList />, {
    mocks
  });

  await wait(0);
  expect(queryByTestId("spinner")).toEqual(null);
  expect(queryByText(contact.email)).not.toEqual(null);
});

test("it shows error", async () => {
  const { container } = renderWithProviders(<ContactsList />, {
    mocks: mocks1
  });

  await wait(0);
  expect(container.innerHTML).toMatch("Error");
});

test("it redirects to add contact form", async () => {
  const { queryByTestId, history } = renderWithProviders(<ContactsList />, {
    mocks
  });
  await wait(0);
  fireEvent.click(queryByTestId("add-new-contact"));
  await wait(0);
  expect(history.location.pathname).toEqual(addRoute);
});
