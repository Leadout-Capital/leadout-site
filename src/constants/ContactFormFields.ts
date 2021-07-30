import { FieldType, FormField, DropdownData } from "../components/Form";

const ContactFormFields = (categoryOptions: DropdownData[]): FormField[] => [
  {
    key: "Co Name",
    title: "Company Name",
    type: FieldType.ShortText,
    required: true
  },
  {
    key: "Website",
    title: "Company Website",
    type: FieldType.Website,
    required: true
  },
  {
    key: "Description",
    title: "Description",
    type: FieldType.LongText,
    required: true
  },
  {
    key: "Category",
    title: "Category",
    type: FieldType.MultipleSelect,
    options: categoryOptions,
    required: false
  },
  {
    key: "Raising",
    title: "Raising",
    subtitle: "What size round are you raising?",
    type: FieldType.LongText,
    required: true
  },
  {
    key: "Pitch Deck / Exec Summary",
    title: "Pitch Deck/Exec Summary",
    type: FieldType.File,
    required: false
  },
  {
    key: "Located",
    title: "Located",
    subtitle: "What timezone are you in?",
    type: FieldType.ShortText,
    required: true
  },
  {
    key: "Company Contact",
    title: "Company Contact",
    subtitle: "Email address where we can reach you",
    type: FieldType.Email,
    required: true
  }
];

export default ContactFormFields;