import { useEffect } from 'react';

const FetchUser = ({ setUsers }) => {
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetch('http://localhost:3000/users', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
        .then((response) => response.json())
        .then((users) => {
          setUsers(users);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [setUsers]);
};

export default FetchUser;
