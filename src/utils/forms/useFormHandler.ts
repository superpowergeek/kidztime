import { ChangeEvent, useEffect, useState } from "react";
import validate from "validate.js";

type TextChangeEvent = ChangeEvent<HTMLTextAreaElement | HTMLInputElement>;;

export type FormField = {
  label: string;
  placeholder?: string;
  initialValue?: string;
  type: "text" | "password";
  validate?: any;
  width?: number;
  disabled?: boolean;
  options?: any;
};
export type FormStructure = {
  [index: string]: FormField;
};
export type FieldErrors = {
  [index: string]: string[];
};
export type FieldDirtys = {
  [index: string]: boolean;
};
export type ObjectMap = {
  [index: string]: any;
}

const defaultEventParser = (event: TextChangeEvent) => event.target.value;

export default (formStructure: FormStructure, initialValue: ObjectMap = {}) => {
  const initialInputs: ObjectMap = {};
  const formSchema: any = {};
  for (const key in formStructure) {
    const { initialValue, validate } = formStructure[key];
    initialInputs[key] = initialValue;
    if (validate)
      formSchema[key] = validate;
  }
  initialValue = { ...initialInputs, ...initialValue };

  for (const key in initialValue) {
    if (initialValue[key] === null) initialValue[key] = "";
  }

  const [inputs, setInputs] = useState(initialValue);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [dirtys, setDirtys] = useState<FieldDirtys>({});

  useEffect(() => {
    const errors = validate(inputs, formSchema);
    setErrors(errors);

    // eslint-disable-next-line
  }, [inputs]);

  const onChange = (field: string) => {
    return (event: ChangeEvent<any>) => {
      const value = defaultEventParser(event);
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        [field]: value,
      }));
      setDirtys((prevDirtys: FieldDirtys) => ({
        ...prevDirtys,
        [field]: true,
      }));
    };
  };

  const setValue = (field: string) => {
    return (value: string) => {
      setInputs((prevInputs: any) => ({
        ...prevInputs,
        [field]: value,
      }));
    };
  };

  const onBlur = (field: string) => {
    return () => {
      setDirtys((prevDirtys: FieldDirtys) => ({
        ...prevDirtys,
        [field]: true,
      }));
    };
  };

  const fields = [];
  for (const key in formStructure) {
    fields.push({
      key,
      onChange: onChange(key),
      onBlur: onBlur(key),
      spec: formStructure[key],
      value: inputs[key],
      setValue: setValue(key),
      dirty: dirtys[key],
      ...!!errors && {
        error: errors[key] && errors[key][0],
      },
      width: formStructure[key].width ? formStructure[key].width : 12,
      disabled: formStructure[key].disabled ? formStructure[key].disabled : false,
      options: formStructure[key].options ? formStructure[key].options : null,
    });
  };

  return [fields, inputs, errors, setInputs, setErrors, setDirtys];
};
