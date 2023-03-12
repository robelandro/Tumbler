#!/usr/local/bin/node
function fetchData() {
    fetch('http://127.0.0.1:5000/users')
      .then(response => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error('Failed to fetch data');
        }
      })
      .then(data => {
        console.log(data);
        // do something with the data
      })
      .catch(error => {
        console.error(error);
      });
  }
function postData() {
    fetch('http://127.0.0.1:5000/add_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'LastName': 'Doe',
          'FirstName': 'John',
          'Address': '123 Main St',
          'City': 'Anytown'
        })
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.error(error);
      });
}

// copy data form api of https://jsonplaceholder.typicode.com/users
function copyData() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('Failed to fetch data');
      }
    })
    .then(data => {
      for (let index = 0; index < data.length; index++) {
        const postData = {
          name: data[index].name,
          email: data[index].email,
          gender: "Male", // You can set a default value or modify as required
          age: 25, // You can set a default value or modify as required
          date_of_birth: "1996-01-01", // You can set a default value or modify as required
          phone: data[index].phone,
          location: data[index].address.city, // You can set a default value or modify as required
          password: "password123" // You can set a default value or modify as required
        };
        console.log(JSON.stringify(postData));
        fetch('http://127.0.0.1:5000/add_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        })
        .then(response => {
          if (response.ok) {
            console.log('Data sent successfully');
          } else {
            throw new Error('Failed to send data');
          }
        })
        .catch(error => {
          console.error(error);
        });
      }
    })
    .catch(error => {
      console.error(error);
    });
}

function deleteData(user_id) {
    // Replace <user_id> with the ID of the user you want to delete

    fetch(`http://127.0.0.1:5000/delete_user/${user_id}`, {
      method: "DELETE"
    })
      .then(response => {
        if (response.ok) {
          console.log("User deleted successfully");
        } else {
          throw new Error("Failed to delete user");
        }
      })
      .catch(error => {
        console.error(error);
      });

}

function updateUser(userId, userData) {
    fetch(`http://api.nftalem.tech/update_user/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    })
    .then(response => {
      if (response.ok) {
        console.log('User updated successfully.');
      } else {
        throw new Error('Failed to update user.');
      }
    })
    .catch(error => {
      console.error(error);
    });
  }
  
  // Example usage
//   const userId = '080fb94d-6105-4d62-99f7-5498c2a09708';
//   const userData = {
//     name: 'kJohn Doe',
//     email: 'jdoes@example.com',
//     phone: '555-555-5555'
//   };

// updateUser(userId, userData);
// fetchData();
// copyData();
const user_id = "080fb94d-6105-4d62-99f7-5498c2a09708";
deleteData(user_id);
