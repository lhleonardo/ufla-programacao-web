import React, { useState, useEffect } from 'react';

import { Link, useLocation } from 'react-router-dom';

import { Container } from './styles';

import Logo from '../../assets/logo.svg';

interface HeaderProps {
  size?: 'small' | 'large';
}

interface NavLinkProps {
  path: string;
  text: string;
}

const NavLink: React.FC<NavLinkProps> = ({ path, text }) => {
  const location = useLocation();

  const [current, setCurrent] = useState(false);

  useEffect(() => {
    setCurrent(location.pathname === path);
  }, [location, path]);

  return (
    <Link to={path} className={current ? 'selected' : ''}>
      {text}
    </Link>
  );
};

const Header: React.FC<HeaderProps> = ({ size = 'large' }: HeaderProps) => {
  return (
    <Container size={size}>
      <header>
        <img src={Logo} alt="GoFinances" />
        <nav>
          <NavLink path="/" text="Listagem" />
          <NavLink path="/new" text="Cadastrar" />

          <NavLink path="/import" text="Importar" />
        </nav>
      </header>
    </Container>
  );
};

export default Header;
