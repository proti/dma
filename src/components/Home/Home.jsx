import React from 'react';
import PropTypes from 'prop-types';
import { Link, Route } from 'react-router-dom';
import style from './home.scss';
import {
  ADD_DICT,
  ADD_DOMAIN,
  ADD_COLOUR,
  DETAILS_ID,
  DETAILS_DOMAIN_ID
} from '../../common/Routes';
import LabelButton from '../../common/components/LabelButton/LabelButton';
import ProductList from '../ProductsDict/ProductList/ProductList';
import ColoursList from '../ColoursDict/ColoursList/ColoursList';
import DomainsList from '../DomainsDict/DomainsList/DomainsList';
import AddNewColour from '../ColoursDict/AddNewColour/AddNewColour';
import AddNewDomain from '../DomainsDict/AddNewDomain/AddNewDomain';
import DomainDetails from '../DomainsDict/DomainDetails/DomainDetails';
import ProductDetails from '../ProductsDict/ProductDetails/ProductDetails';
import AddNewProduct from '../ProductsDict/AddNewProduct/AddNewProduct';

const Home = () => {
  return (
    <main className={style.home}>
      <nav className={style.nav}>
        <Link to={ADD_DICT}>
          <LabelButton>New product dictionary</LabelButton>
        </Link>
        <Link to={ADD_COLOUR}>
          <LabelButton>New Colour</LabelButton>
        </Link>
        <Link to={ADD_DOMAIN}>
          <LabelButton>New Domain</LabelButton>
        </Link>
      </nav>
      <section className={style.container}>
        <div className={style.lists}>
          <ProductList />
          <ColoursList />
          <DomainsList />
        </div>
        <div className={style.content}>
          <Route path={DETAILS_ID} component={ProductDetails} />
          <Route path={ADD_DICT} component={AddNewProduct} />
          <Route path={DETAILS_DOMAIN_ID} component={DomainDetails} />
          <Route path={ADD_DOMAIN} component={AddNewDomain} />
          <Route path={ADD_COLOUR} component={AddNewColour} />
        </div>
      </section>
    </main>
  );
};
export default Home;
