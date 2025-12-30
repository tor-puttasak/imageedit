import { useState, useEffect } from 'react';
import { VIEWS, STATUS_TYPES } from './config/constants';
import { useAuth } from './hooks/useAuth';
import { useStyles, useGallery } from './hooks/useFirestore';

// Components
import { Navigation } from './components/Navigation';
import { StatusToast } from './components/StatusToast';
import { AuthErrorBanner } from './components/AuthErrorBanner';
import { LoginModal } from './components/LoginModal';

// Views
import { HomeView } from './views/HomeView';
import { CameraView } from './views/CameraView';
import { EditorView } from './views/EditorView';
import { AdminView } from './views/AdminView';
import { GalleryView } from './views/GalleryView';

function App() {
  const [view, setView] = useState(VIEWS.HOME);
  const [sourceImage, setSourceImage] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });

  const { user, isAdminMode, authError, loading: authLoading, loginAdmin, logoutAdmin } = useAuth();
  const { styles, addStyle, updateStyle, deleteStyle } = useStyles(user);
  const { gallery, addToGallery, deleteFromGallery } = useGallery(user, isAdminMode);

  const showStatus = (type, text) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: '', text: '' }), 4000);
  };

  const handleViewChange = (newView) => {
    setView(newView);
    if (newView === VIEWS.HOME) {
      setSourceImage(null);
    }
  };

  const handleLogin = async (email, password) => {
    const result = await loginAdmin(email, password);
    if (result.success) {
      showStatus(STATUS_TYPES.SUCCESS, 'เข้าสู่ระบบแอดมินสำเร็จ');
    }
    return result;
  };

  const handleLogout = async () => {
    await logoutAdmin();
    setView(VIEWS.HOME);
    showStatus(STATUS_TYPES.SUCCESS, 'ออกจากระบบเรียบร้อย');
  };

  // Auto-select first style when styles load
  useEffect(() => {
    if (styles.length > 0 && view === VIEWS.EDITOR) {
      // Styles are loaded and available
    }
  }, [styles, view]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center">
        <div className="text-white text-xl animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/40 via-[#020617] to-[#020617] font-sans text-slate-200">
      <AuthErrorBanner error={authError} />
      <StatusToast message={statusMsg.text} type={statusMsg.type} />

      <Navigation
        view={view}
        isAdminMode={isAdminMode}
        onViewChange={handleViewChange}
        onLoginClick={() => setShowLogin(true)}
        onLogout={handleLogout}
      />

      <main className="pb-32 pt-12 px-6">
        {view === VIEWS.HOME && (
          <HomeView
            onViewChange={setView}
            onImageSelect={setSourceImage}
          />
        )}

        {view === VIEWS.CAMERA && (
          <CameraView
            onViewChange={setView}
            onImageSelect={setSourceImage}
          />
        )}

        {view === VIEWS.EDITOR && sourceImage && (
          <EditorView
            sourceImage={sourceImage}
            styles={styles}
            user={user}
            addToGallery={addToGallery}
            onBack={() => {
              setView(VIEWS.HOME);
              setSourceImage(null);
            }}
            onSuccess={(msg) => showStatus(STATUS_TYPES.SUCCESS, msg)}
            onError={(msg) => showStatus(STATUS_TYPES.ERROR, msg)}
          />
        )}

        {view === VIEWS.ADMIN && isAdminMode && (
          <AdminView
            user={user}
            styles={styles}
            onAddStyle={addStyle}
            onUpdateStyle={updateStyle}
            onDeleteStyle={deleteStyle}
            onViewChange={setView}
            onLogout={handleLogout}
            onSuccess={(msg) => showStatus(STATUS_TYPES.SUCCESS, msg)}
          />
        )}

        {view === VIEWS.GALLERY && isAdminMode && (
          <GalleryView
            gallery={gallery}
            onBack={() => setView(VIEWS.ADMIN)}
            onDeleteImage={deleteFromGallery}
            onSuccess={(msg) => showStatus(STATUS_TYPES.SUCCESS, msg)}
          />
        )}
      </main>

      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
          loading={authLoading}
        />
      )}

      <footer className="fixed bottom-10 left-0 w-full px-6 pointer-events-none">
        <div className="max-w-lg mx-auto bg-slate-900/60 backdrop-blur-3xl border border-white/5 py-5 px-10 rounded-[2.5rem] text-center shadow-3xl pointer-events-auto">
          <div className="flex justify-between items-center">
            <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.5em]">
              Neural Alchemy Engine • 2025
            </p>
            <div className="flex space-x-3">
              <span className="w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></span>
              <span className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]"></span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
