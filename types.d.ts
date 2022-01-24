declare enum FieldType {
  ShortText = "ShortText",
  LongText = "LongText",
  SingleSelect = "SingleSelect",
  MultipleSelect = "MultipleSelect",
  File = "File",
  Email = "Email",
  Website = "Website"
}

type DropdownData = {
  id: string,
  name: string
};

type BasicField = {
  key: string,
  title: string,
  subtitle?: string,
  required: boolean
};

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
};

type FileField = BasicField & {
  type: FieldType.File
};

type FormField = SingleSelectField | MultipleSelectField | TextField | FileField;

type Company = {
  name: string,
  image: ImageQuery,
  website: string,
  jobs?: string;
  description: LongTextQuery,
  stealth: false
};

type StealthCompany = {
  name?: string,
  image?: ImageQuery,
  website?: string,
  jobs?: string;
  description?: LongTextQuery,
  stealth: true
};

type PortfolioCompany = Company | StealthCompany;

type LongTextQuery = {
  childMarkdownRemark: {
    html: string
  }
};

type ImageQuery = {
  file: {
    url: string
  }
};

// Content models in Contentful

type ContentfulTextField = {
  body: LongTextQuery
};

type ContentfulContactFormField = Omit<FormField, "options"> & {
  options?: string[],
  airtableTableName?: string,
  airtableColumnName?: string
};

type ContentfulBlogPost = {
  title: string;
  date: string;
  slug: string;
  category: ContentfulBlogCategory;
  body: {
    childMarkdownRemark: {
      excerpt: string;
      timeToRead: number;
      html?: string;
    }
  }
  author: {
    name: string;
    slug: string;
    image: {
      file: {
        url: string;
      }
    }
  }
}

type ContentfulBlogCategory = {
  name: string;
  color: string;
  slug: string;
}

type ContentfulHomepageSection = {
  name: string,
  image: ImageQuery,
  mobileImage?: ImageQuery,
  overlay?: string,
  content: LongTextQuery
};

type ContentfulPortfolioCompany = PortfolioCompany

type ContentfulTeamMember = {
  name: string,
  role: string,
  image: ImageQuery,
  description: LongTextQuery
};

type ContentfulCoreValue = {
  body: LongTextQuery
}

type ContentfulTeamBenefit = {
  title: string,
  body: LongTextQuery
};

type faq = {
  question: string;
  answer: LongTextQuery;
}

type ContentfulNavLink = {
  title: string,
  to: string
}

type ContentfulFooter = {
  twitter: string,
  linkedIn: string,
  medium: string,
  email: string
}

type ContentfulFavicon = {
  image: ImageQuery
}

type ContentfulImageField = {
  image: ImageQuery
}

type QueryNode<T> = {
  node: T
}
