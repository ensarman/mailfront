import React, { useState } from "react";
//import client from "../../graphQLConfig";
import { useQuery, useMutation } from "@apollo/react-hooks";
import NewUserModal from "./NewUserModal/NewUserModal";
import Loading from "../Loading/Loading";

import { gql } from "apollo-boost";
import { Table, Container, Button, Row, Col } from "react-bootstrap";

const ALL_USERS = gql`
  query {
    allUsers {
      id
      email
      domain {
        name
      }
      quota
      password
    }
  }
`;

const CREATE_USER = gql`
  mutation createUserMutation(
    $domain: Int!
    $email: String!
    $password: String!
    $quota: Int!
  ) {
    createUser(
      domain: 4
      email: "usuario2@algo.com"
      password: "password2"
      quota: 4048
    ) {
      id
      email
      domain
      quota
      password
    }
  }
`;

const UserList = () => {
  const { loading, error, data } = useQuery(ALL_USERS);
  //const { loading, error, data } = useQuery(ALL_USERS);

  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);

  if (loading) return <Loading />;
  if (error) return <p>error</p>;

  const tbody = data.allUsers.map(({ id, email, domain, quota, password }) => (
    <tr key={id}>
      <th>{id}</th>
      <td>{email}</td>
      <td>{domain.name}</td>
      <td>{quota}</td>
      <td>{password}</td>
    </tr>
  ));
  // console.log(data.allUsers);
  //console.log("probando");
  return (
    <Container className="my-4">
      <NewUserModal show={show} setShow={setShow} />

      <Row className="mb-3">
        <Col sm={3}>
          <Button variant="outline-primary" onClick={handleShow}>
            Nuevo Usuario
          </Button>
        </Col>
      </Row>
      <Table hover className="table-sm">
        <thead className="thead-dark">
          <tr>
            <th>id</th>
            <th>Email</th>
            <th>Domain</th>
            <th>Quota</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>{tbody}</tbody>
      </Table>
    </Container>
  );
};

export default UserList;
