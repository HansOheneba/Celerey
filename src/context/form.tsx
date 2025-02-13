import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getFormData, setFormData } from "./formStorage";

// Define an interface for your form data structure
// You should modify this interface to match your actual form fields
interface FormData {
  // Example form fields - adjust these based on your actual form needs
  name?: string;
  email?: string;
  age?: number;
  // ... add other form fields as needed
}

// Define the type for the context value
interface FormContextType {
  form: Partial<FormData>;
  setForm: Dispatch<SetStateAction<Partial<FormData>>>;
}

// Create the context with proper typing
export const FormContext = createContext<FormContextType>({
  form: {},
  setForm: () => null,
});

// Define props interface for the provider component
interface FormProviderProps {
  children: ReactNode;
}

const FormProvider = ({ children }: FormProviderProps) => {
  const [form, setForm] = useState<Partial<FormData>>(() => {
    const defaultData: Partial<FormData> = {}; // Define default structure if needed
    return getFormData(defaultData);
  });

  useEffect(() => {
    if (form) {
      setFormData(form);
    }
  }, [form]);

  return (
    <FormContext.Provider value={{ form, setForm }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;

// import { createContext, Dispatch, SetStateAction, useEffect, useState } from "react";
// import { getFormData, setFormData } from "./formStorage"; // Import the sessionStorage utility

// export const FormContext = createContext<{
//   form: Partial<any>;
//   setForm: Dispatch<SetStateAction<Partial<any>>>;
// }>({
//   form: {},
//   setForm: () => null,
// });

// const FormProvider = ({ children }: { children: any }) => {
//   /**
//    * state
//    */
//   const [form, setForm] = useState<Partial<any>>(() => {
//     // Use getFormData to retrieve initial form state from sessionStorage
//     const defaultData = {}; // Define default structure if needed
//     return getFormData(defaultData);
//   });

//   /**
//    * effect
//    */
//   useEffect(() => {
//     if (form) {
//       setFormData(form); // Save form data to sessionStorage whenever it changes
//     }
//   }, [form]);

//   return <FormContext.Provider value={{ form, setForm }}>{children}</FormContext.Provider>;
// };

// export default FormProvider;
