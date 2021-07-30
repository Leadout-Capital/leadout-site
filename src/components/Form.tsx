import * as React from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { FormProps } from "react-html-props";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
  ShortText = "ShortText",
  LongText = "LongText",
  SingleSelect = "SingleSelect",
  MultipleSelect = "MultipleSelect",
  File = "File",
  Email = "Email",
  Website = "Website"
}


export type DropdownData = {
  id: string,
  name: string
}

type BasicField = {
  key: string,
  title: string,
  subtitle?: string,
  required: boolean
}

type SingleSelectField = BasicField & {
  type: FieldType.SingleSelect,
  options: DropdownData[]
};

type MultipleSelectField = BasicField & {
  type: FieldType.MultipleSelect,
  options: DropdownData[]
};

type TextField = BasicField & {
  type: FieldType.ShortText | FieldType.LongText | FieldType.Email | FieldType.Website
}

type FileField = BasicField & {
  type: FieldType.File
}

export type FormField = SingleSelectField | MultipleSelectField | TextField | FileField;

type SubFieldProps = {
  id: string,
  required: boolean,
  register: (...args: any[]) => any
}

type TextFieldProps = SubFieldProps & {
  subtitle?: string
}

type DropdownFieldProps = SubFieldProps & { options: DropdownData[] };
type FileFieldProps = SubFieldProps;

type FormFieldProps = Omit<FormField, "key"> & {
  id: string,
  errors: FieldErrors,
  register: (...args: any[]) => any,
  airtableData?: DropdownData[]
}

type CustomFormProps = FormProps & {
  title: string,
  subtitle?: string | React.ReactNode,
  formId: string,
  fields: FormField[],
  airtableData: { [key: string]: DropdownData[] },
  submit: (data: FormState) => void
}

export interface FormState {
  [key: string]: string | string[] | boolean
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

const SingleSelectField: React.FC<DropdownFieldProps> = ({ id: fieldId, options, required, register }) => (
  <select id={fieldId} defaultValue={""} {...register(fieldId, { required })}>
    <option value={""} disabled>--- Please select ---</option>
    {options ? (
      options.map(({ id, name }) => <option key={id} value={id}>{name}</option>)
    ) : <option value={"LOADING"} disabled>Loading data...</option>}
  </select>
);

const MultipleSelectField: React.FC<DropdownFieldProps> = ({ id: fieldId, options, required, register }) => {
  const [hidden, setHidden] = React.useState(true);
  const [buttonHeight, setButtonHeight] = React.useState(48);
  const [contentHeight, setContentHeight] = React.useState(0);
  const [textWidth, setTextWidth] = React.useState(1000);
  const [selected, setSelected] = React.useState<string[]>([]);

  const buttonRef = React.useRef<HTMLDivElement>();
  const contentRef = React.useRef<HTMLDivElement>();
  const pRef = React.useRef<HTMLDivElement>();

  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      setSelected(selected.filter((value) => value !== option));
    } else {
      setSelected([...selected, option])
    }
  };

  React.useEffect(() => {
    if (!(buttonRef.current && contentRef.current && pRef.current)) {
      return;
    }
    const getDims = (ref) => ref.current.getBoundingClientRect();
    setButtonHeight(getDims(buttonRef).height);
    setContentHeight(getDims(contentRef).height);
    setTextWidth(getDims(pRef).width);
  }, [buttonRef.current, contentRef.current, pRef.current, options]);

  return (
    <div className={"multiple-select"} style={{ height: hidden ? buttonHeight : contentHeight + buttonHeight }}>
      <div className={"dropdown"} onClick={() => setHidden(!hidden)} ref={buttonRef}>
        <p style={{ maxWidth: textWidth }} ref={pRef}>{selected.length > 0 ? selected.join(", ") : "No options selected..."}</p>
        <FontAwesomeIcon icon={faChevronLeft} className={"arrow " + (hidden ? "left" : "down")} />
      </div>
      <div className={"options"} ref={contentRef}>
        {options ? options.map(({ id, name }) => (
          <label key={id}>
            <input
              type={"checkbox"}
              name={fieldId}
              value={id}
              tabIndex={-1}
              onClick={() => toggleOption(name)}
              {...register(fieldId, { required })}
            />
            {name}
          </label>
        )) : <p className={"loading"}>Loading options...</p>}
      </div>
    </div>
  )
};

const FileField: React.FC<FileFieldProps> = ({ id, required, register }) => (
  <input type={"file"} id={id} {...register(id, { required })} />
);

const ErrorMessage = ({ error }) => {
  const [message, setMessage] = React.useState("NO ERROR");
  const prevError = React.useRef(error);

  const changeErrorMessage = () => {
    if (error && error.type === "required") {
      setMessage("This field is required");
    } else if (error) {
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

const FormField: React.FC<FormFieldProps> = ({ id, title, type, errors, required, airtableData, ...props }) => {
  let field;
  switch (type) {
    case FieldType.ShortText:
      field = <ShortTextField id={id} required={required} {...props} />;
      break;
    case FieldType.LongText:
      field = <LongTextField id={id} required={required} {...props} />
      break;
    case FieldType.SingleSelect:
      // @ts-ignore
      field = <SingleSelectField {...props} id={id} required={required} options={airtableData ? airtableData : props.options} />
      break;
    case FieldType.MultipleSelect:
      // @ts-ignore
      field = <MultipleSelectField {...props} id={id} required={required} options={airtableData ? airtableData : props.options} />
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

const Form: React.FC<CustomFormProps> = ({ title, subtitle, fields, airtableData, formId, submit, className = "", ...props }) => {
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
          key={field.key}
          airtableData={airtableData[field.key]}
          id={`${formId}-${field.key}`}
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