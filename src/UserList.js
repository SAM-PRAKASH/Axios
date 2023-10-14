import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserList = () => {
  const [userList, setUserList] = useState([]);
  const [popoverAddressContent, setPopoverAddressContent] = useState('');
  const [popoverCompanyContent, setPopoverCompanyContent] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUserList(response.data);
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);

  const addressPopoverClick = (address) => {
    setPopoverAddressContent(address);
  };
  const companyPopoverClick = (company) => {
    setPopoverCompanyContent(company);
  };

  const deleteUser = (id) => {
    setUserList(prevUsers => prevUsers.filter(user => user.id !== id));
  };

  const addUser = () => {
 
    const newUserId = userList.length + 1;
    
 
    const newUser = {
      id: newUserId,
      name: newUserName,
      username: newUserEmail,
    };

    setUserList(prevUsers => [...prevUsers, newUser]);

    setNewUserName('');
    setNewUserEmail('');
  };

  return (
    <div>
      <h1>User List</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>User Name</th>
            <th>City</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {userList.map(user => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.username}</td>
              <td>
                <button
                  type="button"
                  className="btn"
                  data-toggle="popover"
                  title="Address"
                  data-content={user.name + user.address.street + ', ' + user.address.suite + ', ' + user.address.city + ' - ' + user.address.zipcode + " / " + "Lat" + user.address.geo.lat + " Lng" + user.address.geo.lng}
                  onClick={() => addressPopoverClick('User Name: ' + user.name + ' - Full Address: ' + user.address.street + ', ' + user.address.suite + ', ' + user.address.city + ' - ' + user.address.zipcode + " / " + "Lat" + user.address.geo.lat + " Lng" + user.address.geo.lng)}
                >Address</button>
              </td>
              <td>{user.phone}</td>
              <td>{user.website}</td>
              <td>
              <button
              type="button"
                  className="btn"
                  data-toggle="popover"
                  title="Company"
                  data-content={user.name + user.company.name + ',' + user.company.catchPhrase + ',' + user.company.bs}
                  onClick={() => companyPopoverClick('User Name: ' + user.name + ' - Company Details: ' + user.company.name + ',' + user.company.catchPhrase + ',' + user.company.bs)}
              >Company</button>
              </td>
              <td> <button onClick={() => deleteUser(user.id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>


      <input
        type="text"
        placeholder="Name"
        value={newUserName}
        onChange={(e) => setNewUserName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Email"
        value={newUserEmail}
        onChange={(e) => setNewUserEmail(e.target.value)}
      />
      <button onClick={addUser}>Add New User</button>

      {popoverAddressContent && (
        <div className="popover-content">
          <h3>Address:</h3>
          <p>{popoverAddressContent}</p>
        </div>
      )}
      {popoverCompanyContent && (
        <div className="popover-content">
          <h3>Company:</h3>
          <p>{popoverCompanyContent}</p>
        </div>
      )}
    </div>
  );
};

export default UserList;
