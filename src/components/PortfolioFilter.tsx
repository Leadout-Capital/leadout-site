import React, { Fragment } from 'react'
import { Listbox } from '@headlessui/react'

type PortfolioFilterProps = {
  companies: ContentfulPortfolioCompany[];
  selectedStatus: string;
  setSelectedStatus: Function;
  selectedSector: string;
  setSelectedSector: (value: string) => void;
}

export const PortfolioFilter = ({
  companies,
  selectedStatus,
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
    <div className="filter">
      <p>Filter by: </p>
      <button onClick={() => setSelectedStatus(undefined)} className={selectedStatus === undefined && 'active'}>All</button>
      {dedupedStatuses.map((status) => <button onClick={() => setSelectedStatus(status)} className={selectedStatus === status && 'active'}>{status}</button>)}

      <div className="select-field-wrapper">
        <Listbox value={selectedSector} onChange={setSelectedSector}>
          {({open}) => (
            <>
              <Listbox.Button className={selectedSector && 'active'}>{selectedSector || 'Sector'} <span className={`chevron-down ${open ? 'chevron-open' : ''}`} /></Listbox.Button>
              <Listbox.Options className="options">
                <Listbox.Option key={0} value={undefined} as={Fragment}>
                {({ active, selected }) => (
                  <li className={`${active ? 'active' : ''} ${selected ? 'selected' : ''}`}>All</li>
                )}
                </Listbox.Option>
                {dedupedSectors.map((sector) => (
                  <Listbox.Option
                    key={sector}
                    value={sector}
                    as={Fragment}
                  >
                    {({ active, selected }) => (
                      <li className={`${active ? 'active' : ''} ${selected ? 'selected' : ''}`}>{sector}</li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </>
          )}
        </Listbox>
      </div>
    </div>
  )
}
