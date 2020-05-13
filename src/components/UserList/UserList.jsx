import React, { useState } from "react";
//import client from "../..graphQLConfig";
import { useQuery } from "@apollo/react-hooks";
import NewUserModal from "./NewUserModal/NewUserModal";
import DeleteUserModal from "./DeleteUserModal/DeleteUserModal";
import Loading from "../Loading/Loading";
import ErrorNotification from "../ErrorNotification/ErrorNotification";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const UserList = () => {
  const { loading, error, data, refetch } = useQuery(ALL_USERS, {
    fetchPolicy: "no-cache",
  });

  const [newUserShow, setNewUserShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [userData, setUserData] = useState({});

  const handleDeleteShow = (user) => {
    setDeleteShow(true);
    setUserData(user);
  };

  if (loading) return <Loading />;
  else if (error) {
    return <ErrorNotification error={error} />;
  } else {
    return (
      <Container className="my-4">
        <NewUserModal
          show={newUserShow}
          setShow={setNewUserShow}
          refetch={refetch}
        />
        <DeleteUserModal
          show={deleteShow}
          setShow={setDeleteShow}
          userData={userData}
          refetch={refetch}
        />

        <Row className="mb-3">
          <Col sm={3}>
            <Button
              variant="outline-primary"
              onClick={() => setNewUserShow(true)}
            >
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
              <th>Eliminar?</th>
            </tr>
          </thead>
          <tbody>
            {data.allUsers.map((user) => (
              <tr key={"key-" + user.id}>
                <th>{user.id}</th>
                <td>{user.email}</td>
                <td>{user.domain.name}</td>
                <td>{user.quota}</td>
                <td>{user.password}</td>
                <td align="center">
                  <p onClick={() => handleDeleteShow(user)}>
                    <FontAwesomeIcon icon={["far", "trash-alt"]} />
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    );
  }
};

export default UserList;
