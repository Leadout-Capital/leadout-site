import { Link } from 'gatsby';
import React from 'react';

interface IPageNav {
  page: number;
  totalPages: number;
  url: string;
}

export const PageNav: React.FC<IPageNav> = ({ page, totalPages, url }): JSX.Element => {
  return (
    <div className="page-nav">
      <div className="inner-wrapper">
        <div className="col">
          {page > 1 ? (
            <Link
              to={`${url}/${page > 2 ? page - 1 : ''}`}
              className="button"
            >
              {`< Previous`}
            </Link>
          ) : (
            ''
          )}
        </div>
        <div className="inner col">
          Page <strong>{page}</strong> of <strong>{totalPages}</strong>
        </div>
        <div className="col">
          {page < totalPages ? (
            <Link to={`${url}/${page + 1}`} className="button">
              {`Next >`}
            </Link>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
};
