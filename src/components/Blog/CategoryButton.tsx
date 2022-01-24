import React from 'react';
import { Link } from 'gatsby';

export const CategoryButton = ({ category, color, url }) => (
  <div className={`blog-category ${color}`}>
    <Link to={url}>
      {category}
    </Link>
  </div>
)
