const LogOut = () => {
  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Log Out</h1>
      <button type="button" onClick={handleLogOut}>Log Out</button>
    </div>
  );
};

export default LogOut;
