import { AlertCircle } from 'lucide-react';

export const AuthErrorBanner = ({ error }) => {
  if (!error) return null;

  return (
    <div className="bg-rose-600 text-white p-4 text-center font-bold text-sm animate-pulse sticky top-0 z-[100]">
      <AlertCircle className="inline mr-2" size={18}/>
      พบข้อผิดพลาด: {error}
    </div>
  );
};
