import React from 'react'

type PortfolioFilterProps = {
  companies: ContentfulPortfolioCompany[];
  setSelectedStatus: Function;
  selectedSector: string;
  setSelectedSector: Function;
}

export const PortfolioFilter = ({
  companies,
  setSelectedStatus,
  selectedSector,
  setSelectedSector
}: PortfolioFilterProps) => {
  // Get list of statuses
  const statuses = [];
  companies.map(company => statuses.push(company.status));
  const dedupedStatuses = [...new Set(statuses)];

  // Get list of sectors
  const sectors = [];
  companies.map(company => company.portfolioCompanySectors.map(sector => sectors.push(sector.sectorName)));
  const dedupedSectors = [...new Set(sectors)];
  console.log(dedupedSectors);

  return (
    <div>
      <button onClick={() => setSelectedStatus(undefined)}>All</button>
      {dedupedStatuses.map((status) => <button onClick={() => setSelectedStatus(status)}>{status}</button>)}
    </div>
  )
}
