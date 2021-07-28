import { FieldType, FormField, DropdownData } from "../components/Form";

const ContactFormFields = (categoryOptions: DropdownData[]): FormField[] => [
  {
    id: "Co Name",
    title: "Company Name",
    type: FieldType.ShortText,
    required: true
  },
  {
    id: "Website",
    title: "Company Website",
    type: FieldType.Website,
    required: true
  },
  {
    id: "Description",
    title: "Description",
    type: FieldType.LongText,
    required: true
  },
  {
    id: "Category",
    title: "Category",
    type: FieldType.MultipleSelect,
    options: categoryOptions,
    required: false
  },
  {
    id: "Raising",
    title: "Raising",
    subtitle: "What size round are you raising?",
    type: FieldType.LongText,
    required: true
  },
  {
    id: "Pitch Deck / Exec Summary",
    title: "Pitch Deck/Exec Summary",
    type: FieldType.File,
    required: false
  },
  {
    id: "Located",
    title: "Located",
    subtitle: "What timezone are you in?",
    type: FieldType.ShortText,
    required: true
  },
  {
    id: "Company Contact",
    title: "Company Contact",
    subtitle: "Email address where we can reach you",
    type: FieldType.Email,
    required: true
  }
];

export default ContactFormFields;