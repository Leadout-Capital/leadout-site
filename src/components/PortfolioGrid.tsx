import React, { RefObject, useState } from 'react'
import DelayEach from './DelayEach';
import { ExecuteOnScroll } from './OnScroll';
import { PortfolioFilter } from './PortfolioFilter';

type PortfolioCompanyProps = {
  name: string,
  description: LongTextQuery,
  website: string,
  jobs?: string,
}

type PortfolioGridProps = {
  isMobile?: boolean;
  companies: ContentfulPortfolioCompany[];
  companiesRef?: RefObject<HTMLDivElement>;
  stealthImage: ContentfulImageField;
  sectionTitle: string;
}

const PortfolioCompany: React.FC<PortfolioCompanyProps> = ({ name, description, website, jobs }) => (
  <>
    <div className={"dark company-container"}>
      <h3>{name}</h3>
      <span dangerouslySetInnerHTML={{ __html: description.childMarkdownRemark.html }} />
      <div className="link-wrapper">
        <a href={website} target={"_blank"}>Visit website</a>
        {jobs && jobs !== '0' && <a href={jobs} target={"_blank"}>Open Jobs</a>}
      </div>
    </div>
  </>
);

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ isMobile, companies, companiesRef, stealthImage }) => {
  const [selectedStatus, setSelectedStatus] = useState('Active');
  const [selectedSector, setSelectedSector] = useState('Consumer');

  // const filters = [
  //   selectedStatus && { type: 'status', name: selectedStatus },
  //   selectedSector && { type: 'sector', name: selectedSector }
  // ];

  // const filteredPortfolio = companies.filter((el) => {
  //   filters.every((filterEl) => filterEl ? el.status === filterEl.name || el.portfolioCompanySectors.some((sector) => sector.sectorName === selectedSector) : true);
  // })

  // const filteredPortfolio = companies;

  const filteredPortfolio = companies.filter(
    (company) => selectedStatus ? company.status === selectedStatus : true
    ).filter(
    (company) => selectedSector ? company.portfolioCompanySectors.some((sector) => sector.sectorName === selectedSector) : true
    );
  return (
    <section>
      {/* <h2 className="portfolio-header">{sectionTitle}</h2> */}
      <PortfolioFilter
        companies={companies}
        setSelectedStatus={setSelectedStatus}
        selectedSector={selectedSector}
        setSelectedSector={setSelectedSector}
      />
        {isMobile ? (
          <div className={"portfolio-companies"}>
            {filteredPortfolio.map((
              {
                name,
                image,
                website,
                jobs,
                description,
                stealth,
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
                    <PortfolioCompany name={name} description={description} website={website} jobs={jobs} />
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
              render={filteredPortfolio.map((
                {
                  name,
                  image,
                  website,
                  jobs,
                  description,
                  stealth,
                }) => (
                stealth ? (
                  <div
                    key={name}
                    className={"company-background"}
                    style={{ backgroundImage: `url(https:${stealthImage.image.file.url})` }}
                  />
                ) : (
                  <div key={name} className={"company-background"} style={{ backgroundImage: `url(https:${image.file.url})` }}>
                    <PortfolioCompany name={name} description={description} website={website} jobs={jobs} />
                  </div>
                )
              ))} />
          </ExecuteOnScroll>
        )}
      </section>
  )
}
