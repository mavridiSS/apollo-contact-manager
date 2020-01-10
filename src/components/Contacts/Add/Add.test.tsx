import React from "react";
import { fireEvent, cleanup } from "@testing-library/react";
import AddContact from "./Add";
import { CONTACTS_LIST } from "../../../const/queries";
import wait from "waait";
import { InMemoryCache } from "apollo-cache-inmemory";
import { renderWithProviders } from "../../../test-utils";
import { contact, mocks } from "../../../test-utils/mockData";

const route = "/contacts/add";

let cache = null;

function setup() {
  cache = new InMemoryCache();

  cache.writeQuery({
    query: CONTACTS_LIST,
    data: {
      contacts: []
    }
  });
}

describe("adding new contact", () => {
  // Applies only to tests in this describe block
  beforeEach(() => {
    return setup();
  });

  afterEach(() => {
    cache = null;
    cleanup();
  });

  test("renders without error", () => {
    renderWithProviders(<AddContact />, {
      route,
      mocks,
      cache
    });
  });

  test("if it adds new contact and updates cache", async () => {
    const { getByTestId } = renderWithProviders(<AddContact />, {
      route,
      mocks,
      cache
    });

    const nameInput = getByTestId("name-input");
    const emailInput = getByTestId("email-input");
    fireEvent.change(nameInput, { target: { value: contact.name } });
    fireEvent.change(emailInput, { target: { value: contact.email } });
    fireEvent.click(getByTestId("save"));

    await wait(0);

    const { contacts } = cache.readQuery({ query: CONTACTS_LIST });
    expect(contacts.length).toEqual(1);
    expect(contacts[0]).toEqual(contact);
  });

  test("if adding a new contact redirects to contacts list", async () => {
    const { getByTestId, history } = renderWithProviders(<AddContact />, {
      route,
      mocks,
      cache
    });

    const nameInput = getByTestId("name-input");
    const emailInput = getByTestId("email-input");
    fireEvent.change(nameInput, { target: { value: contact.name } });
    fireEvent.change(emailInput, { target: { value: contact.email } });
    fireEvent.click(getByTestId("save"));

    await wait(0);

    expect(history.location.pathname).toEqual("/");
  });
});
