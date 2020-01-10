import React from "react";
import { fireEvent } from "@testing-library/react";
import EditContact from "./Edit";
import { CONTACTS_LIST } from "../../../const/queries";
import wait from "waait";
import { InMemoryCache } from "apollo-cache-inmemory";
import { renderWithProviders } from "../../../test-utils";
import { contact, contactAfterEdit, mocks } from "../../../test-utils/mockData";

let cache: any;

function setup() {
  cache = new InMemoryCache() as any;
  cache.writeQuery({
    query: CONTACTS_LIST,
    data: {
      contacts: [contact]
    }
  });
}

describe("editing contact", () => {
  beforeEach(() => {
    return setup();
  });

  afterEach(() => {
    cache = null;
  });

  test("renders without error", () => {
    renderWithProviders(<EditContact />, {
      route: `/contact/${contact.id}/edit`,
      withRoute: "/contact/:id/edit",
      mocks,
      cache
    });
  });

  test("it renders spinner", () => {
    const { queryByTestId } = renderWithProviders(<EditContact />, {
      route: `/contact/${contact.id}/edit`,
      withRoute: "/contact/:id/edit",
      mocks,
      cache
    });

    expect(queryByTestId("spinner")).not.toEqual(null);
  });

  test("if it populates correctly inputs with contact information", async () => {
    const { getByTestId } = renderWithProviders(<EditContact />, {
      route: `/contact/${contact.id}/edit`,
      withRoute: "/contact/:id/edit",
      mocks,
      cache
    });

    await wait(1);

    const nameInput = getByTestId("name-input");
    const emailInput = getByTestId("email-input");

    expect(nameInput.value).toBe(contact.name);
    expect(emailInput.value).toBe(contact.email);
  });

  test("if it edits contact and updates cache", async () => {
    const { getByTestId } = renderWithProviders(<EditContact />, {
      route: `/contact/${contact.id}/edit`,
      withRoute: "/contact/:id/edit",
      mocks,
      cache
    });

    await wait(0);
    const emailInput = getByTestId("email-input");
    fireEvent.change(emailInput, {
      target: { value: contactAfterEdit.email }
    });
    fireEvent.click(getByTestId("save"));

    await wait(0);

    const { contacts } = cache.readQuery({ query: CONTACTS_LIST });
    expect(contacts.length).toEqual(1);
    expect(contacts[0]).toEqual(contactAfterEdit);
  });

  test("if adding a new contact redirects to contacts list", async () => {
    const { getByTestId, history } = renderWithProviders(<EditContact />, {
      route: `/contact/${contact.id}/edit`,
      withRoute: "/contact/:id/edit",
      mocks,
      cache
    });

    await wait(0);
    const emailInput = getByTestId("email-input");
    fireEvent.change(emailInput, {
      target: { value: contactAfterEdit.email }
    });
    fireEvent.click(getByTestId("save"));
    await wait(0);
    expect(history.location.pathname).toEqual("/");
  });
});
