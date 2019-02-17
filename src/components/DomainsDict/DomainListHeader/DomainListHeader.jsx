import React from 'react';
import style from './domainListheader.scss';
import { DOMAIN, RANGE } from '../DomainsColumns';

const DomainListHeader = () => {
  return (
    <div className={style.domainListHeader}>
      <div>{DOMAIN}</div>
      <div>{RANGE}</div>
    </div>
  );
};

export default DomainListHeader;
