import { useState, useEffect } from 'react';
import {
  signInAnonymously,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { auth } from '../config/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!auth.currentUser) {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.error("Auth Error:", err);
        if (err.code === 'auth/configuration-not-found') {
          setAuthError("กรุณาเปิดใช้งาน 'Anonymous' ในหน้า Firebase Console");
        } else if (err.code === 'auth/admin-restricted-operation') {
          setAuthError("กรุณาเปิด 'Enable create (sign up)' ในหน้า Authentication Settings");
        } else {
          setAuthError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setIsAdminMode(u && !u.isAnonymous);
      setLoading(false);
    });

    initAuth();
    return () => unsubscribe();
  }, []);

  const loginAdmin = async (email, password) => {
    setLoading(true);
    try {
      const emailToUse = email.includes('@') ? email : `${email}@admin.com`;
      await signInWithEmailAndPassword(auth, emailToUse, password);
      return { success: true };
    } catch (err) {
      return { success: false, error: "บัญชีผู้ใช้หรือรหัสผ่านไม่ถูกต้อง" };
    } finally {
      setLoading(false);
    }
  };

  const logoutAdmin = async () => {
    await signOut(auth);
    try {
      await signInAnonymously(auth);
    } catch (e) {
      console.error('Re-authentication error:', e);
    }
  };

  return {
    user,
    isAdminMode,
    authError,
    loading,
    loginAdmin,
    logoutAdmin,
  };
};
