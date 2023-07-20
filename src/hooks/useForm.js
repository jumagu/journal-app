import { useEffect, useMemo, useState } from "react";

export const useForm = (initialForm = {}, formValidations = {}) => {
  const [formState, setFormState] = useState(initialForm);
  const [formValidation, setFormValidation] = useState({});

  const isFormValid = useMemo(() => {
    for (const formValue of Object.keys(formValidation)) {
      if (formValidation[formValue] !== null) return false;
    }

    return true;
  }, [formValidation]);

  useEffect(() => {
    createValidators();
  }, [formState]);

  useEffect(() => {
    setFormState(initialForm);
  }, [initialForm]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormState({ ...formState, [name]: value });
  };

  const onResetForm = () => {
    setFormState(initialForm);
  };

  const createValidators = () => {
    const formCheckValues = {};

    for (const formField of Object.keys(formValidations)) {
      const [validationFunction, errorMessage] = formValidations[formField];
      formCheckValues[`${formField}Valid`] = validationFunction(
        formState[formField]
      )
        ? null
        : errorMessage;
    }

    setFormValidation(formCheckValues);
  };

  return {
    ...formState,
    formState,
    onResetForm,
    onInputChange,
    ...formValidation,
    isFormValid,
  };
};
