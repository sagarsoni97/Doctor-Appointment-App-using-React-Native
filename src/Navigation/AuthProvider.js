import React, { createContext, useState } from 'react';
import auth from '@react-native-firebase/auth';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    
    return (
     
     <AuthContext.Provider
        value={{
          user,
          setUser,
          login: async (email, password) => {
            if (!email || !password) {
              alert('Please fill all field')
              return
          }
            try {
              await auth().signInWithEmailAndPassword(email, password);
            } catch (e) {
              alert(e);
            }
          },

          register: async (email, password) => {
            if (!email || !password) {
              alert('Please fill all field')
              return
          }
            try {
              await auth().createUserWithEmailAndPassword(email, password);
            } catch (e) {
              alert(e);
            }
          },

          logout: async () => {
            try {
              await auth().signOut();
            } catch (e) {
              alert(e);
            }
          }
          
        }}
      >
        
        {children}
      </AuthContext.Provider>
    );
  };