// interfaces
export interface Person {
  name: string;
  email: string;
}

export interface ContactId {
  id: number;
}
export interface Contact {
  id: string;
  name: string;
  email: string;
}

export interface ContactData {
  contact: Contact;
}

export interface ContactVars {
  id: string;
}

export interface ContactsResult {
  contacts: Contact[];
}
