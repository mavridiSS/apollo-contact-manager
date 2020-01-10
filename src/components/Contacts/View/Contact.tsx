import React, { memo } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Person } from "../../../types";
import "./Contact.css";

interface Props {
  contact: Person;
  onDelete: () => void;
  onEdit: () => void;
}

function Contact({ contact, onDelete, onEdit }: Props) {
  return (
    <div className="contact-card">
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2">
            {contact.name}
          </Typography>
          <Typography variant="h5" component="h2">
            {contact.email}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            onClick={onDelete}
            color="secondary"
            variant="contained"
            size="small"
          >
            Delete
          </Button>
          <Button
            onClick={onEdit}
            color="primary"
            variant="contained"
            size="small"
          >
            Edit
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export default memo(Contact);
