
// Data login statis
const validUser = {
  username: 'admin',
  password: 'admin',
  fullName: 'Bayu Husada',
};

export const login = (username, password) => {
  if (
    username === validUser.username &&
    password === validUser.password
  ) {
    localStorage.setItem('user', JSON.stringify(validUser));
    return true;
  }
  return false;
};

export const isAuthenticated = () => {
  const user = localStorage.getItem('user');
  console.log('Auth check:', !!user); // DEBUG LOG
  return !!user;
};


export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const logout = () => {
  localStorage.removeItem('user');
};
