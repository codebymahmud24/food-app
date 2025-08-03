import { useEffect, useState } from 'react';

type ToastType = 'success' | 'error';

type ToastProps = {
  message: string;
  type: ToastType;
};

export const Toast = ({ message, type }: ToastProps) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg transition-opacity duration-300 ${type === 'success' ? 'bg-green-500' : 'bg-red-500'} text-white flex items-center gap-2`}
    >
      {type === 'success' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      {message}
    </div>
  );
};

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastProps[]>([]);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        setToasts((prevToasts) => prevToasts.slice(1));
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const toast = ({ message, type }: ToastProps) => {
    setToasts((prevToasts) => [...prevToasts, { message, type }]);
  };

  const ToastContainer = () => (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map((toast, index) => (
        <Toast key={index} message={toast.message} type={toast.type} />
      ))}
    </div>
  );

  return { toast, ToastContainer };
};