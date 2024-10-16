import './links-block.scss';
import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoutes } from '../../../const/router-const';
import { LinksBlockAlignment } from '../../../const/common-const';

type LinksBlockPropsType = {
  links: {
    route: AppRoutes,
    anchor: string
  }[],
  alignment: LinksBlockAlignment
};

function LinksBlock({ links, alignment }: LinksBlockPropsType) {
  const getLinks = () => links.map((link, i) => (
    <Link
      key={`linkId-${i}`}
      className='dark-link links-blocks-item'
      to={link.route}
    >
      {link.anchor}
    </Link>
  ));

  return (
    <div className={`links-blocks-${alignment}`}>
      {getLinks()}
    </div>
  );
}

export default LinksBlock;