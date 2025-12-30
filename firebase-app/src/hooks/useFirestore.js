import { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  onSnapshot,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import { APP_ID, FIRESTORE_COLLECTIONS } from '../config/constants';

const getCollectionPath = (type) => {
  const { ARTIFACTS, PUBLIC, DATA } = FIRESTORE_COLLECTIONS;
  return `${ARTIFACTS}/${APP_ID}/${PUBLIC}/${DATA}/${type}`;
};

export const useStyles = (user) => {
  const [styles, setStyles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const stylesPath = getCollectionPath(FIRESTORE_COLLECTIONS.STYLES);
    const unsubscribe = onSnapshot(
      collection(db, stylesPath),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStyles(data);
        setLoading(false);
      },
      (err) => {
        console.error("Styles sync error:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user]);

  const addStyle = async (styleData) => {
    const stylesPath = getCollectionPath(FIRESTORE_COLLECTIONS.STYLES);
    return addDoc(collection(db, stylesPath), {
      ...styleData,
      timestamp: serverTimestamp(),
    });
  };

  const updateStyle = async (styleId, styleData) => {
    const stylesPath = getCollectionPath(FIRESTORE_COLLECTIONS.STYLES);
    return updateDoc(doc(db, stylesPath, styleId), styleData);
  };

  const deleteStyle = async (styleId) => {
    const stylesPath = getCollectionPath(FIRESTORE_COLLECTIONS.STYLES);
    return deleteDoc(doc(db, stylesPath, styleId));
  };

  return { styles, loading, addStyle, updateStyle, deleteStyle };
};

export const useGallery = (user, isAdminMode) => {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdminMode) {
      setLoading(false);
      return;
    }

    const galleryPath = getCollectionPath(FIRESTORE_COLLECTIONS.GALLERY);
    const unsubscribe = onSnapshot(
      collection(db, galleryPath),
      (snapshot) => {
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const sorted = data.sort((a, b) =>
          (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0)
        );
        setGallery(sorted);
        setLoading(false);
      },
      (err) => {
        console.error("Gallery sync error:", err);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, isAdminMode]);

  const addToGallery = async (imageData) => {
    const galleryPath = getCollectionPath(FIRESTORE_COLLECTIONS.GALLERY);
    return addDoc(collection(db, galleryPath), {
      ...imageData,
      timestamp: serverTimestamp(),
    });
  };

  const deleteFromGallery = async (imageId) => {
    const galleryPath = getCollectionPath(FIRESTORE_COLLECTIONS.GALLERY);
    return deleteDoc(doc(db, galleryPath, imageId));
  };

  return { gallery, loading, addToGallery, deleteFromGallery };
};
