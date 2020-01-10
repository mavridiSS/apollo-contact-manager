import React from "react";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import ContactForm from "../Form/Form";
import Loading from "../../UI/Loading";
import { EDIT_CONTACT, GET_CONTACT } from "../../../const/queries";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Error from "../../UI/Error";
import { Person } from "../../../types";

type TParams = { history: string };

const EditContact: React.FC<RouteComponentProps<TParams>> = props => {
  const { id } = useParams();

  const onAddContactSuccess = () => {
    props.history.push("/");
  };

  const [updateContact] = useMutation(EDIT_CONTACT, {
    onCompleted: onAddContactSuccess
  });
  const { loading, error, data } = useQuery(GET_CONTACT, {
    variables: {
      id
    }
  });

  const onSubmit = (contact: Person) => {
    updateContact({
      variables: {
        contact: {
          id,
          ...contact
        }
      }
    });
  };
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data.contact)
    return <Error error={`Contact with ID: ${id} was not found!`} />;
  return <ContactForm onSubmit={onSubmit} contact={data.contact} />;
};

export default withRouter(EditContact);
