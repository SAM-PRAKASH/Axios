import React, { Component } from 'react';
import axios from 'axios';
import { Button, Modal, Form , Container , Card , Col , Row } from 'react-bootstrap';

class UserList extends Component {
  state = {
    users: [],
    showAddModal: false,
    showEditModal: false,
    selectedUser: {},
    newUser: {
      name: '',
      email: '',
    },
  };

  componentDidMount() {
    this.fetchUsers();
  }

  fetchUsers = () => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then((response) => {
        this.setState({ users: response.data });
      })
      .catch((error) => {
        console.error('Error : Fetching User Data', error);
      });
  };

  handleAddModal = () => {
    this.setState({ showAddModal: !this.state.showAddModal });
  };

  handleEditModal = (user) => {
    this.setState({ showEditModal: !this.state.showEditModal, selectedUser: user });
  };

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      newUser: { ...this.state.newUser, [name]: value },
    });
  };

  handleAddUser = () => {
    const { newUser, users } = this.state;
    if (newUser.name && newUser.email) {
      const updatedUsers = [...users, newUser];
      this.setState({
        users: updatedUsers,
        newUser: {},
      });
      this.handleAddModal();
    } else {
      console.error('Error adding user: Required fields are missing');
    }
  };

  handleEditUser = () => {
    const { selectedUser, users } = this.state;
    const userIndex = users.findIndex(user => user.id === selectedUser.id);
  
    if (userIndex !== -1) {
      const updatedUsers = [...users];
      updatedUsers[userIndex] = selectedUser;
  
      this.setState({
        users: updatedUsers,
        selectedUser: {},
      });
      this.handleEditModal();
    } else {
      console.error('Error editing user: User not found');
    }
  };

  handleDeleteUser = (id) => {
    const updatedUsers = this.state.users.filter(user => user.id !== id);
    this.setState({ users: updatedUsers });
  };

  render() {
    const { users } = this.state;
    return (
      <div>
        <h1>User List</h1>
        <Button variant="primary" onClick={this.handleAddModal}>Add User</Button>
        <Container>
        <Row>
          {users.map((user) => (
            <Col key={user.id} md={4}>
              <Card>
                <Card.Body>
                  <Card.Text>
                  <strong>Name:</strong>{user.name}<br></br>
                    <strong>Email:</strong> {user.email}
                  </Card.Text>
                  <Button variant="info" onClick={() => this.handleEditModal(user)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => this.handleDeleteUser(user.id)}>
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

        <Modal show={this.state.showAddModal} onHide={this.handleAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={this.state.newUser.name} onChange={this.handleChange} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={this.state.newUser.email} onChange={this.handleChange} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleAddModal}>Cancel</Button>
            <Button variant="primary" onClick={this.handleAddUser}>Save</Button>
          </Modal.Footer>
        </Modal>

        <Modal show={this.state.showEditModal} onHide={this.handleEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={this.state.selectedUser.name} onChange={(e) => this.handleEditModal({ ...this.state.selectedUser, name: e.target.value })} />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" value={this.state.selectedUser.email} onChange={(e) => this.handleEditModal({ ...this.state.selectedUser, email: e.target.value })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleEditModal}>Cancel</Button>
            <Button variant="primary" onClick={this.handleEditUser}>Save</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UserList;


