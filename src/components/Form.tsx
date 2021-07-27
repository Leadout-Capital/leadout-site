import * as React from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { FormProps } from "react-html-props";
import "../stylesheets/form.scss";

const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const URL_REGEX = new RegExp('^(https?:\\/\\/)?'+ // protocol
  '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
  '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
  '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
  '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
  '(\\#[-a-z\\d_]*)?$','i');
const ERROR_TRANSITION = 0.2;

export enum FieldType {
  ShortText,
  LongText,
  Dropdown,
  File,
  Email,
  Website
}

type BasicField = {
  id: string,
  title: string,
  subtitle?: string,
  required: boolean
}

type DropdownField = BasicField & {
  type: FieldType.Dropdown,
  options: string[]
}

type TextField = BasicField & {
  type: FieldType.ShortText | FieldType.LongText | FieldType.Email | FieldType.Website
}

type FileField = BasicField & {
  type: FieldType.File
}

export type FormField = DropdownField | TextField | FileField;

type SubFieldProps = {
  id: string,
  required: boolean,
  register: (...args: any[]) => any
}

type TextFieldProps = SubFieldProps & {
  subtitle?: string
}

type DropdownFieldProps = SubFieldProps & { options: string[] };
type FileFieldProps = SubFieldProps;

type FormFieldProps = FormField & {
  errors: FieldErrors,
  register: (...args: any[]) => any
}

type CustomFormProps = FormProps & {
  title: string,
  subtitle?: string | React.ReactNode,
  formId: string,
  fields: FormField[],
  submit: (data: FormState) => void
}

export interface FormState {
  [key: string]: string
}

const ShortTextField: React.FC<TextFieldProps> = ({ id, required, subtitle = "", register }) => (
  <input type={"text"} id={id} placeholder={subtitle} {...register(id, { required })} />
);

const EmailField: React.FC<TextFieldProps> = ({ id, required, subtitle = "", register }) => (
  <input
    type={"email"}
    id={id}
    placeholder={subtitle}
    {...register(id, {
      required,
      pattern: {
        value: EMAIL_REGEX,
        message: "Please enter a valid email address"
      }
    })}
  />
);

const WebsiteField: React.FC<TextFieldProps> = ({ id, required, subtitle = "", register }) => (
  <input
    type={"url"}
    id={id}
    placeholder={subtitle}
    {...register(id, {
      required,
      pattern: {
        value: URL_REGEX,
        message: "Please enter a valid website URL"
      }
    })}
  />
);

const LongTextField: React.FC<TextFieldProps> = ({ id, required, subtitle = "", register }) => (
  <textarea id={id} placeholder={subtitle} {...register(id, { required })} />
);

const DropdownField: React.FC<DropdownFieldProps> = ({ id, options, required, register }) => (
  <select id={id} defaultValue={""} {...register(id, { required })}>
    <option value={""} disabled>--- Please select ---</option>
    {options.map((value) => <option key={value} value={value}>{value}</option>)}
  </select>
);

const FileField: React.FC<FileFieldProps> = ({ id, required, register }) => (
  <input type={"file"} id={id} {...register(id, { required })} />
);

const ErrorMessage = ({ error }) => {
  const [message, setMessage] = React.useState("NO ERROR");
  const prevError = React.useRef(error);

  const changeErrorMessage = () => {
    if (!error) {
      setMessage("NO ERROR");
    } else if (error.type === "required") {
      setMessage("This field is required");
    } else {
      setMessage(error.message);
    }
    prevError.current = error;
  };

  React.useEffect(() => {
    if (!prevError.current) {
      changeErrorMessage();
    } else {
      setTimeout(changeErrorMessage, ERROR_TRANSITION * 1000);
    }
  }, [error]);

  return (
    <p className={"error"} style={{ transitionDuration: ERROR_TRANSITION + "s", opacity: error ? 1 : 0 }}>
      {message}
    </p>
  )
}

const FormField: React.FC<FormFieldProps> = ({ id, title, type, errors, required, ...props }) => {
  let field;
  switch (type) {
    case FieldType.ShortText:
      field = <ShortTextField id={id} required={required} {...props} />;
      break;
    case FieldType.LongText:
      field = <LongTextField id={id} required={required} {...props} />
      break;
    case FieldType.Dropdown:
      // @ts-ignore
      field = <DropdownField id={id} required={required} {...props} />
      break;
    case FieldType.File:
      field = <FileField id={id} required={required} {...props} />
      break;
    case FieldType.Email:
      field = <EmailField id={id} required={required} {...props} />
      break;
    case FieldType.Website:
      field = <WebsiteField id={id} required={required} {...props} />
      break;
    default:
      field = null;
  }
  return (
    <div className={"field"}>
      <div className={"title-container"}>
        <label htmlFor={id}>
          {title}
          {!required && <span className={"optional"}>&nbsp; (optional)</span>}
        </label>
      </div>
      <div className={"input-container"}>
        {field}
        <ErrorMessage error={errors[id]} />
      </div>
    </div>
  )
};

const Form: React.FC<CustomFormProps> = ({ title, subtitle, fields, formId, submit, className = "", ...props }) => {
  const { register, handleSubmit, clearErrors, formState: { errors } } = useForm<FormState>({
    criteriaMode: "all",
    reValidateMode: "onSubmit"
  });
  return (
    <form noValidate id={formId} className={"custom-form " + className} onSubmit={handleSubmit(submit)} {...props}>
      <div className={"form-header"}>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      {fields.map((field) => (
        <FormField
          key={field.id}
          id={`${formId}-${field.id}`}
          register={register}
          errors={errors}
          {...field}
        />
      ))}
      <div className={"buttons"}>
        <input type={"reset"} onClick={() => clearErrors()} />
        <input type={"submit"} />
      </div>
    </form>
  );
};

export default Form;