import React from 'react';
import { Link } from 'gatsby';

export const CategoryButton = ({ category, color, url }) => (
  <Link to={url} className={`blog-category ${color}`}>
    {category}
  </Link>
)
