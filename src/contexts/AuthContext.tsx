"use client"

import React, { createContext, useContext, useState, useEffect } from 'react';

interface Student {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  student: Student | null;
  login: (studentId: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const validStudents: Record<string, Student> = {
  '12345': {
    id: '12345',
    name: 'Rahul Kumar',
    email: 'rahul.kumar@mec.edu',
  },
  '67890': {
    id: '67890',
    name: 'Priya Sharma',
    email: 'priya.sharma@mec.edu',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [student, setStudent] = useState<Student | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedStudentId = localStorage.getItem('studentId');
    if (storedStudentId && validStudents[storedStudentId]) {
      setStudent(validStudents[storedStudentId]);
    }
    setIsLoading(false);
  }, []);

  const login = (studentId: string): boolean => {
    const studentData = validStudents[studentId];
    if (studentData) {
      setStudent(studentData);
      localStorage.setItem('studentId', studentId);
      return true;
    }
    return false;
  };

  const logout = () => {
    setStudent(null);
    localStorage.removeItem('studentId');
    localStorage.removeItem('cart');
    localStorage.removeItem('orders');
  };

  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider
      value={{
        student,
        login,
        logout,
        isAuthenticated: !!student,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
