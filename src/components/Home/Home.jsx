import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import style from './home.scss';
import { ADD_DICT, ADD_DOMAIN, ADD_COLOUR } from '../../common/Routes';
import LabelButton from '../../common/components/LabelButton/LabelButton';
import ProductList from '../ProductsDict/ProductList/ProductList';
import ColoursList from '../ColoursDict/ColoursList/ColoursList';
import DomainsList from '../DomainsDict/DomainsList/DomainsList';

const Home = () => {
  return (
    <main className={style.home}>
      <nav>
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
      <section>
        <ProductList />
        <ColoursList />
        <DomainsList />
      </section>
    </main>
  );
};
const {} = PropTypes;

Home.propTypes = {};

Home.defaultProps = {};
export default Home;
