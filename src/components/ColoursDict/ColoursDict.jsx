import React from 'react';
import { Route } from 'react-router-dom';
import ColoursList from './ColoursList/ColoursList';
import ColoursDomainsList from './ColoursDomainsList/ColoursDomainsList';
import { COLOURS_DOMAINS, ADD_COLOURS_DOMAIN, EDIT_COLOURS_DOMAIN_ID } from '../../common/Routes';
import AddColoursDomain from './ColoursDomainsList/AddColoursDomain/AddColoursDomain';
import style from './coloursDict.scss';
import EditColoursDomain from './ColoursDomainsList/EditColoursDomain/EditColoursDomain';

const ColoursDict = () => {
  return (
    <div className={style.coloursDict}>
      <ColoursList />
      <Route path={COLOURS_DOMAINS} component={ColoursDomainsList} />
      <Route path={ADD_COLOURS_DOMAIN} component={AddColoursDomain} />
      <Route path={EDIT_COLOURS_DOMAIN_ID} component={EditColoursDomain} />
    </div>
  );
};

export default ColoursDict;
