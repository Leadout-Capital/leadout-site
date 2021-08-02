import * as React from "react";
import ImageFade, { Section } from "../components/ImageFade";
import { ToggleOnScroll } from "../components/OnScroll";
import "../stylesheets/index.scss";
import { graphql } from "gatsby";

type IndexPageProps = {
  data: {
    definition: ContentfulHomepageSection,
    quote: ContentfulHomepageSection,
    header: ContentfulTextField
  }
}

const rawToSection = (key: string, section: ContentfulHomepageSection, isMobile: boolean, textModifier = (html: string) => html): Section => ({
  key,
  image: (isMobile && section.mobileImage) ? section.mobileImage.file.url : section.image.file.url,
  overlay: section.overlay,
  section: (
    <div className={"light panel " + key} dangerouslySetInnerHTML={{ __html: textModifier(section.content.childMarkdownRemark.html) }} />
  )
});

// Adds quote marks to the quote section (adds both big and small left quotes for mobile/desktop)
const addQuotations = (quoteText: string) => {
  let trimmedText = quoteText.replace("<p>", "").replace("</p>", "");
  return `
    <span class="start-quote">&ldquo;</span>
    <p>
      <span class="start-quote-mobile">&ldquo;</span>${trimmedText}&rdquo;
    </p>`;
}

const IndexPage: React.FC<IndexPageProps> = ({ data }) => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [innerHeight, setInnerHeight] = React.useState<number>(1000);
  const sectionData = React.useMemo(() => [
    rawToSection("definition", data.definition, isMobile),
    rawToSection("quote", data.quote, isMobile, addQuotations)
  ], [data, isMobile]);

  React.useEffect(() => {
    const checkScrolled = () => {
      if (!scrolled && window.scrollY > window.innerHeight * 0.3) {
        setScrolled(true);
      } else if (scrolled && window.scrollY <= window.innerHeight * 0.3) {
        setScrolled(false);
      }
    }
    window.addEventListener("scroll", checkScrolled);
    return () => window.removeEventListener("scroll", checkScrolled);
  }, [scrolled]);

  React.useEffect(() => {
    const updateDimensions = () => {
      setInnerHeight(window.innerHeight);
      setIsMobile(window.innerWidth <= 500);
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <main className={"home"}>
      <ToggleOnScroll
        topBound={-innerHeight * 0.7}
        bottomBound={innerHeight * 2}
        className={"header"}
        defaultShown
      >
        <span dangerouslySetInnerHTML={{ __html: data.header.body.childMarkdownRemark.html }} />
        <p className={"background-text"}>leadout</p>
      </ToggleOnScroll>
      <ImageFade className={"dark"} data={sectionData} />
    </main>
  )
}

export default IndexPage;

export const query = graphql`
  query {
    definition: contentfulHomepageSection(name: { eq: "Definition" }) {
      image {
        file {
          url
        }
      }
      mobileImage {
        file {
          url
        }
      }
      overlay
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    quote: contentfulHomepageSection(name: { eq: "Quote" }) {
      image {
        file {
          url
        }
      }
      mobileImage {
        file {
          url
        }
      }
      overlay
      content {
        childMarkdownRemark {
          html
        }
      }
    }
    header: contentfulTextField(name: { eq: "Homepage Header" }) {
      body {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`;