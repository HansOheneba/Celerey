import { useContext } from 'react';

import { FormContext } from '../context/form';

export const useForm = () => {
  const form = useContext(FormContext);
  return form;
};

export default useForm;
