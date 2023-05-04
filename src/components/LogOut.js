const LogOut = () => {
  const handleLogOut = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <button type="button" onClick={handleLogOut}>Sign Out</button>
    </div>
  );
};

export default LogOut;
