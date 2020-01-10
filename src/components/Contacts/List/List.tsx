import React from "react";
import { useQuery } from "@apollo/react-hooks";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { withRouter, RouteComponentProps } from "react-router-dom";
import Loading from "../../UI/Loading";
import { CONTACTS_LIST } from "../../../const/queries";
import Error from "../../UI/Error";
import { Contact } from "../../../types";
import "./List.css";

type TParams = { history: string };

const ContactsList: React.FC<RouteComponentProps<TParams>> = props => {
  const onContactClick = (id: string) => {
    props.history.push(`/contact/${id}`);
  };

  const onNewContactClick = () => {
    props.history.push(`/contacts/add`);
  };
  const { loading, error, data } = useQuery(CONTACTS_LIST);
  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="container">
      <List component="nav">
        {data.contacts.map((contact: Contact) => {
          return (
            <ListItem
              key={contact.id}
              button
              onClick={() => onContactClick(contact.id)}
            >
              <ListItemText primary={contact.name} secondary={contact.email} />
            </ListItem>
          );
        })}
      </List>
      <Button
        data-testid="add-new-contact"
        onClick={onNewContactClick}
        variant="contained"
        color="primary"
      >
        New Contact
      </Button>
    </div>
  );
};

export default withRouter(ContactsList);
