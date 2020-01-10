import gql from "graphql-tag";

const ADD_CONTACT = gql`
  mutation addContact($contact: InputContact) {
    addContact(contact: $contact) {
      id
      name
      email
      __typename
    }
  }
`;

const CONTACTS_LIST = gql`
  {
    contacts {
      id
      name
      email
    }
  }
`;

const EDIT_CONTACT = gql`
  mutation updateContact($contact: InputContact) {
    updateContact(contact: $contact) {
      id
      name
      email
      __typename
    }
  }
`;

const GET_CONTACT = gql`
  query getContact($id: ID!) {
    contact(id: $id) {
      id
      name
      email
      __typename
    }
  }
`;

const DELETE_CONTACT = gql`
  mutation deleteContact($id: ID) {
    deleteContact(id: $id)
  }
`;

export {
  ADD_CONTACT,
  CONTACTS_LIST,
  EDIT_CONTACT,
  GET_CONTACT,
  DELETE_CONTACT
};
