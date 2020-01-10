import React from "react";
import { useMutation } from "@apollo/react-hooks";
import ContactForm from "../Form/Form";
import { ADD_CONTACT, CONTACTS_LIST } from "../../../const/queries";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { Person, ContactsResult } from "../../../types";

type TParams = { history: string };

const AddContact: React.FC<RouteComponentProps<TParams>> = props => {
  const onAddContactSuccess = () => {
    props.history.push("/");
  };

  const [addContact] = useMutation(ADD_CONTACT, {
    onCompleted: onAddContactSuccess,
    update(cache, { data: { addContact } }) {
      const contacts = cache.readQuery<ContactsResult>({
        query: CONTACTS_LIST
      })!.contacts;
      cache.writeQuery({
        query: CONTACTS_LIST,
        data: {
          contacts: contacts.concat(addContact)
        }
      });
    }
  });

  const onSubmit = (contact: Person) => {
    addContact({
      variables: {
        contact
      }
    });
  };

  return <ContactForm onSubmit={onSubmit} />;
};

export default withRouter(AddContact);
