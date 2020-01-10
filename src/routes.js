import React, { lazy, Suspense } from "react";
import { Switch, Route } from "react-router-dom";
import Loading from "./components/UI/Loading";
import Layout from "./components/UI/Layout/Layout";

const ContactsList = lazy(() => import("./components/Contacts/List/List"));
const ContactContainer = lazy(() => import("./components/Contacts/View/View"));
const AddContact = lazy(() => import("./components/Contacts/Add/Add"));
const EditContact = lazy(() => import("./components/Contacts/Edit/Edit"));

export const Routes = (
  <Suspense fallback={<Loading />}>
    <Switch>
      <Layout>
        <Route exact path="/">
          <ContactsList />
        </Route>
        <Route exact path="/contact/:id">
          <ContactContainer />
        </Route>
        <Route exact path="/contacts/add">
          <AddContact />
        </Route>
        <Route path="/contact/:id/edit">
          <EditContact />
        </Route>
      </Layout>
    </Switch>
  </Suspense>
);
