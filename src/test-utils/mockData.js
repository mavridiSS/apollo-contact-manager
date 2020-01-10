import {
  GET_CONTACT,
  EDIT_CONTACT,
  DELETE_CONTACT,
  ADD_CONTACT,
  CONTACTS_LIST
} from "../const/queries";

const contact = {
  id: "1",
  name: "ivan",
  email: "vanko1@gmail.com",
  __typename: "Contact"
};

const contactAfterEdit = {
  ...contact,
  email: "vanko123@gmail.com"
};

// omit __typename
const { __typename, ...contactForEdit } = contactAfterEdit;

const mocks = [
  {
    request: {
      query: GET_CONTACT,
      variables: { id: contact.id }
    },
    result: {
      data: {
        contact
      }
    }
  },
  {
    request: {
      query: EDIT_CONTACT,
      variables: { contact: contactForEdit }
    },
    result: {
      data: {
        updateContact: contactAfterEdit
      }
    }
  },
  {
    request: {
      variables: { id: contact.id },
      query: DELETE_CONTACT
    },
    result: {
      data: {
        deleteContact: true
      }
    }
  },
  {
    request: {
      query: ADD_CONTACT,
      variables: { contact: { name: contact.name, email: contact.email } }
    },
    result: {
      data: {
        addContact: contact
      }
    }
  },
  {
    request: {
      query: CONTACTS_LIST
    },
    result: {
      data: {
        contacts: [contact]
      }
    }
  }
];

export { mocks, contact, contactAfterEdit };
