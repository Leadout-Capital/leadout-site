import React, { RefObject } from 'react'
import DelayEach from './DelayEach';
import { ExecuteOnScroll } from './OnScroll';

type PortfolioCompanyProps = {
  name: string,
  description: LongTextQuery,
  website: string,
  jobs?: string
  alumni: boolean;
}

type PortfolioGridProps = {
  isMobile?: boolean;
  companies: ContentfulPortfolioCompany[];
  companiesRef?: RefObject<HTMLDivElement>;
  stealthImage: ContentfulImageField;
  sectionTitle: string;
}

const PortfolioCompany: React.FC<PortfolioCompanyProps> = ({ name, description, website, jobs, alumni }) => (
  <>
    <div className={"dark company-container"}>
      <h3>{name}</h3>
      <span dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
      <div className="link-wrapper">
        <a href={website} target={"_blank"}>Visit website</a>
        {jobs && <a href={jobs} target={"_blank"}>Open Jobs</a>}
      </div>
    </div>
    {/* {alumni && <div className="alumni"><p>Alumni</p></div>} */}
  </>
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
                jobs,
                description,
                stealth,
                alumni
              }) => (
              stealth ? (
                <div className={"company-wrapper"}>
                  <ExecuteOnScroll
                    key={name}
                    className={"show-on-scroll company-background stealth"}
                    style={{ backgroundImage: `url(https:${stealthImage.image.file.url})` }}
                  />
                </div>
              ) : (
                <div className={"company-wrapper"}>
                  <ExecuteOnScroll
                    key={name}
                    className={"show-on-scroll company-background"}
                    style={{ backgroundImage: `url(https:${image.file.url})` }}
                  >
                    <PortfolioCompany name={name} description={description} website={website} jobs={jobs} alumni={alumni} />
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
                  jobs,
                  description,
                  stealth,
                  alumni
                }) => (
                stealth ? (
                  <div
                    key={name}
                    className={"company-background"}
                    style={{ backgroundImage: `url(https:${stealthImage.image.file.url})` }}
                  />
                ) : (
                  <div key={name} className={"company-background"} style={{ backgroundImage: `url(https:${image.file.url})` }}>
                    <PortfolioCompany name={name} description={description} website={website} jobs={jobs} alumni={alumni} />
                  </div>
                )
              ))} />
          </ExecuteOnScroll>
        )}
      </section>
  )
}
