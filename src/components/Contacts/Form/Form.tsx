import React, { useRef, useState, SyntheticEvent } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { validate } from "../../../utils";
import { Contact, Person } from "../../../types";
import "./Form.css";

interface Props {
  contact?: Contact;
  onSubmit(contact: Person): void;
}

interface InvalidFields {
  name?: object;
  email?: object;
}

const ContactForm = (props: Props) => {
  const [invalidFields, setInvalidFields] = useState<InvalidFields>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    const contact = {
      name: nameRef.current!.value,
      email: emailRef.current!.value
    };
    const fields = validate(contact);

    if (!Object.keys(fields).length) {
      props.onSubmit(contact);
    } else {
      setInvalidFields(fields);
    }
  };

  const { contact } = props;

  return (
    <div className="contact-form">
      <form onSubmit={onSubmit}>
        <div>
          <TextField
            defaultValue={contact ? contact.name : ""}
            id="name-input"
            label="Name"
            {...invalidFields.name}
            inputRef={nameRef}
            inputProps={{
              "data-testid": "name-input"
            }}
          />
        </div>
        <div>
          <TextField
            defaultValue={contact ? contact.email : ""}
            id="email-input"
            label="Email"
            {...invalidFields.email}
            inputRef={emailRef}
            inputProps={{
              "data-testid": "email-input"
            }}
          />
        </div>
        <div>
          <Button
            type="submit"
            size="small"
            variant="contained"
            color="primary"
            style={{
              marginTop: "10px"
            }}
            data-testid="save"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
