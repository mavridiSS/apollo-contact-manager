import React from "react";
import { fireEvent } from "@testing-library/react";
import ContactContainer from "./View";
import { GET_CONTACT, CONTACTS_LIST } from "../../../const/queries";
import wait from "waait";
import { GraphQLError } from "graphql";
import { renderWithProviders } from "../../../test-utils";
import { contact, mocks } from "../../../test-utils/mockData";
import { InMemoryCache } from "apollo-cache-inmemory";

const mocks1 = [
  {
    request: {
      query: GET_CONTACT
    },
    result: {
      error: new GraphQLError("Error!")
    }
  }
];

test("it renders without errors", () => {
  renderWithProviders(<ContactContainer />, {
    mocks,
    route: `/contact/${contact.id}`,
    withRoute: "/contact/:id"
  });
});

test("loading state when retrieving a contact", () => {
  const { queryByTestId } = renderWithProviders(<ContactContainer />, {
    mocks,
    route: `/contact/${contact.id}`,
    withRoute: "/contact/:id"
  });

  expect(queryByTestId("spinner")).not.toEqual(null);
});

test("it renders a contact and hides spinner", async () => {
  const { queryByTestId, queryByText } = renderWithProviders(
    <ContactContainer />,
    {
      mocks,
      route: `/contact/${contact.id}`,
      withRoute: "/contact/:id"
    }
  );
  await wait(1);
  expect(queryByTestId("spinner")).toEqual(null);
  expect(queryByText(contact.email)).not.toEqual(null);
});

test("it shows error", async () => {
  const { container } = renderWithProviders(<ContactContainer />, {
    mocks: mocks1,
    route: `/contact/${contact.id}`,
    withRoute: "/contact/:id"
  });

  await wait(0);
  expect(container.innerHTML).toMatch("Error");
});

test("should delete and updates cache", async () => {
  const cache = new InMemoryCache();

  cache.writeQuery({
    query: CONTACTS_LIST,
    data: {
      contacts: [{ ...contact, __typename: "Contact" }]
    }
  });

  const { queryByText } = renderWithProviders(<ContactContainer />, {
    mocks,
    route: `/contact/${contact.id}`,
    withRoute: "/contact/:id",
    cache
  });
  await wait(0);

  fireEvent.click(queryByText("Delete"));

  await wait(0);
  const { contacts } = cache.readQuery({ query: CONTACTS_LIST });
  expect(contacts.length).toEqual(0);
});
