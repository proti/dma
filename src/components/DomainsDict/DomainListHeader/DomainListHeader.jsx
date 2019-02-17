import React from 'react';
import style from './domainListheader.scss';
import { DOMAIN, RANGE } from '../DomainsColumns';

const DomainListHeader = () => {
  return (
    <div className={style.listHeader}>
      <span>{DOMAIN}</span>
      <span>{RANGE}</span>
    </div>
  );
};

export default DomainListHeader;
