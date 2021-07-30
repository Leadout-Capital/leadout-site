import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { ExecuteOnScroll } from "../components/OnScroll";
import DelayEach from "../components/DelayEach";
import PortfolioCompanies from "../constants/PortfolioCompanies";
import "../stylesheets/porfolio.scss";

export type PortfolioCompany = Company | StealthCompany;

type Company = {
  name: string,
  image: string,
  website: string,
  description: string,
  stealth: false
}

type StealthCompany = {
  name?: string,
  image?: string,
  website?: string,
  description?: string,
  stealth: true
}

const Portfolio = () => {
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const companiesRef = React.useRef<HTMLDivElement>();

  const scrollToCompanies = () => {
    if (!companiesRef.current) return;
    companiesRef.current.scrollIntoView({ block: "start", inline: "nearest", behavior: "smooth" });
  }

  React.useEffect(() => {
    const checkDimensions = () => setIsMobile(window.innerWidth <= 500);
    checkDimensions();
    window.addEventListener("resize", checkDimensions);
    return () => window.removeEventListener("resize", checkDimensions);
  })

  return (
    <main className={"portfolio"}>
      <header>
        <h1>
          We look to identify, partner with, and support <span className={"highlight"}>non-obvious</span>,
          <span className={"highlight"}> under-represented</span> founders <span className={"highlight"}>early</span>.
        </h1>
        <h2>
          These founders are core to developing technology that expands access to capital, information and opportunity
          for
          overlooked markets and communities.
        </h2>
        <div className={"down-arrow"}>
          <FontAwesomeIcon icon={faChevronDown} className={"icon"} onClick={scrollToCompanies}/>
        </div>
      </header>
      {isMobile ? (
        <div className={"portfolio-companies"}>
          {PortfolioCompanies.map((
            {
              name,
              image,
              website,
              description,
              stealth
            }) => (
            stealth ? (
              <div className={"company-wrapper"}>
                <ExecuteOnScroll key={name} className={"show-on-scroll company-background stealth"}/>
              </div>
            ) : (
              <div className={"company-wrapper"}>
                <ExecuteOnScroll
                  key={name}
                  className={"show-on-scroll company-background"}
                  style={{backgroundImage: `url(${image})`}}
                >
                  <div className={"dark company-container"}>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <a href={website} target={"_blank"}>Visit website</a>
                  </div>
                </ExecuteOnScroll>
              </div>
            )
          ))}
        </div>
      ) : (
        <ExecuteOnScroll className={"portfolio-companies"} ref={companiesRef}>
          <DelayEach
            useP={false}
            className={"company-wrapper"}
            delay={0.1}
            render={PortfolioCompanies.map((
              {
                name,
                image,
                website,
                description,
                stealth
              }) => (
              stealth ? <div key={name} className={"company-background stealth"} /> : (
                <div key={name} className={"company-background"} style={{ backgroundImage: `url(${image})` }}>
                  <div className={"dark company-container"}>
                    <h3>{name}</h3>
                    <p>{description}</p>
                    <a href={website} target={"_blank"}>Visit website</a>
                  </div>
                </div>
              )
            ))} />
        </ExecuteOnScroll>
      )}
    </main>
  )
};

export default Portfolio;