import React, { RefObject } from 'react'
import DelayEach from './DelayEach';
import { ExecuteOnScroll } from './OnScroll';

type PortfolioCompanyProps = {
  name: string,
  description: LongTextQuery,
  website: string
}

type PortfolioGridProps = {
  isMobile?: boolean;
  companies: ContentfulPortfolioCompany[];
  companiesRef?: RefObject<HTMLDivElement>;
  stealthImage: ContentfulImageField;
  sectionTitle: string;
}

const PortfolioCompany: React.FC<PortfolioCompanyProps> = ({ name, description, website }) => (
  <div className={"dark company-container"}>
    <h3>{name}</h3>
    <span dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
    <a href={website} target={"_blank"}>Visit website</a>
  </div>
);

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ isMobile, companies, companiesRef, stealthImage, sectionTitle }) => {
  return (
    <section>
      <h2 className="portfolio-header">{sectionTitle}</h2>
        {isMobile ? (
          <div className={"portfolio-companies"}>
            {companies.map((
              {
                name,
                image,
                website,
                description,
                stealth
              }) => (
              stealth ? (
                <div className={"company-wrapper"}>
                  <ExecuteOnScroll key={name} className={"show-on-scroll company-background stealth"} />
                </div>
              ) : (
                <div className={"company-wrapper"}>
                  <ExecuteOnScroll
                    key={name}
                    className={"show-on-scroll company-background"}
                    style={{ backgroundImage: `url(https:${image.file.url})` }}
                  >
                    <PortfolioCompany name={name} description={description} website={website} />
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
              render={companies.map((
                {
                  name,
                  image,
                  website,
                  description,
                  stealth
                }) => (
                stealth ? (
                  <div
                    key={name}
                    className={"company-background"}
                    style={{ backgroundImage: `url(https:${stealthImage.image.file.url})` }}
                  />
                ) : (
                  <div key={name} className={"company-background"} style={{ backgroundImage: `url(https:${image.file.url})` }}>
                    <PortfolioCompany name={name} description={description} website={website} />
                  </div>
                )
              ))} />
          </ExecuteOnScroll>
        )}
      </section>
  )
}
