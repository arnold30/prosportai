import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const user = localStorage.getItem('prosportai_currentUser');
      if (user) {
        setCurrentUser(JSON.parse(user));
      }
    } catch (error) {
      console.error("Error al cargar usuario desde localStorage:", error);
      localStorage.removeItem('prosportai_currentUser'); 
    } finally {
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    try {
      localStorage.setItem('prosportai_currentUser', JSON.stringify(userData));
      setCurrentUser(userData);
    } catch (error) {
      console.error("Error al guardar usuario en localStorage:", error);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem('prosportai_currentUser');
      setCurrentUser(null);
    } catch (error)      {
      console.error("Error al eliminar usuario de localStorage:", error);
    }
  };
  
  const register = (userData) => {
    login(userData);
  };

  const updateUser = (updatedUserData) => {
    try {
      localStorage.setItem('prosportai_currentUser', JSON.stringify(updatedUserData));
      setCurrentUser(updatedUserData);

      // Actualizar también la lista general de usuarios si es necesario
      const users = JSON.parse(localStorage.getItem("prosportai_users")) || [];
      const userIndex = users.findIndex(u => u.id === updatedUserData.id);
      if (userIndex !== -1) {
        users[userIndex] = updatedUserData;
        localStorage.setItem("prosportai_users", JSON.stringify(users));
      }

    } catch (error) {
      console.error("Error al actualizar usuario en localStorage:", error);
    }
  };


  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register, loading, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};