import React from "react";
import { useParams, withRouter, RouteComponentProps } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/react-hooks";
import Loading from "../../UI/Loading";
import Contact from "./Contact";
import Error from "../../UI/Error";
import { Contact as ContactType, ContactsResult } from "../../../types";
import {
  DELETE_CONTACT,
  CONTACTS_LIST,
  GET_CONTACT
} from "../../../const/queries";

type TParams = { history: string };

interface asd {}

const ContactContainer: React.FC<RouteComponentProps<TParams>> = props => {
  const { id } = useParams();
  const [deleteContact] = useMutation(DELETE_CONTACT, {
    variables: {
      id
    },
    onCompleted: () => props.history.push("/"),
    update(cache) {
      const contacts = cache.readQuery<ContactsResult>({
        query: CONTACTS_LIST
      })!.contacts;
      cache.writeQuery({
        query: CONTACTS_LIST,
        data: {
          contacts: contacts.filter((contact: ContactType) => contact.id !== id)
        }
      });
    }
  });

  const { loading, error, data } = useQuery(GET_CONTACT, {
    variables: {
      id
    }
  });

  const onEdit = () => {
    const to = `/contact/${id}/edit`;
    props.history.push(to);
  };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data!.contact)
    return <Error error={`Contact with ID: ${id} was not found!`} />;
  return (
    <Contact contact={data!.contact} onDelete={deleteContact} onEdit={onEdit} />
  );
};

export default withRouter(ContactContainer);
