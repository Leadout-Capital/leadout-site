import * as React from "react";
import ImageFade, { Section } from "../components/ImageFade";
import { ToggleOnScroll } from "../components/OnScroll";
import BikeRiding from "../images/bike-riding.jpeg";
import BikeRidingMobile from "../images/bike-riding-mobile.jpeg";
import AliHomepage from "../images/ali-homepage.jpeg";
import AliHomepageMobile from "../images/ali-homepage-mobile.jpeg";
import "../stylesheets/index.scss";

// TODO: get higher res photo of ali for this page

const DATA = (isMobile: boolean): Section[] => [
  {
    key: "definition",
    image: isMobile ? BikeRidingMobile : BikeRiding,
    section: (
      <div className={"light panel definition"}>
        <h1>leadout</h1>
        <h2>/l&#275;d out/</h2>
        <h3>noun</h3>
        <p>
          To win a race, a professional cyclist relies on a &ldquo;leadout&rdquo;: an echelon formation created by
          their teammates. The team creates a streamline to hold their sprinter teammate in a draft thereby
          leveraging the racer’s speed and strength to sprint for the race win.
        </p>
      </div>
    )
  },
  {
    key: "quote",
    image: isMobile ? AliHomepageMobile : AliHomepage,
    overlay: "rgba(71, 71, 71, 0.8)",
    section: (
      <div className={"light panel quote"}>
        <span className={"start-quote"}>&ldquo;</span>
        <p>
          <span className={"start-quote-mobile"}>&ldquo;</span>We believe in the value inherent in diversity, wide
          network persistence and accessibility, and expanding the size of the market of new ideas, products and
          leaders.&rdquo;
        </p>
        <h6>Ali Rosenthal, Managing Partner</h6>
      </div>
    )
  }
];

const IndexPage = () => {
  const [scrolled, setScrolled] = React.useState<boolean>(false);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [innerHeight, setInnerHeight] = React.useState<number>(1000);

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
        <h2>
          We are Leadout Capital, an early stage venture-capital fund
        </h2>
        <h1>
          We back &ldquo;<span className={"highlight"}>non-obvious</span>,&rdquo;
          <span className={"highlight"}> resilient</span> founders in
          <span className={"highlight"}> overlooked</span>, <span className={"highlight"}>underserved</span> markets
        </h1>
        <p className={"background-text"}>leadout</p>
      </ToggleOnScroll>
      <ImageFade className={"dark"} data={DATA(isMobile)} />
    </main>
  )
}

export default IndexPage;
