import { useContext, createContext, ReactNode } from "react";
import { ToastProps } from "./toast";

type Toast = Omit<ToastProps, "id">;

type ToastContextType = {
  toast: (props: Toast) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);


export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};


let externalToast: (props: Toast) => void = () => {
  throw new Error("toast() called outside of ToastProvider");
};

export const toast = (props: Toast) => {
  externalToast(props);
};

interface ToastProviderWrapperProps {
  children: ReactNode;
  addToast: (toast: ToastProps) => void;
}

export const ToastProviderWrapper = ({
  children,
  addToast,
}: ToastProviderWrapperProps) => {
  const toast = (props: Toast) => {
    const newToast: ToastProps = {
      id: Date.now().toString(),
      ...props,
    };
    addToast(newToast);
  };

  externalToast = toast;

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
    </ToastContext.Provider>
  );
};
