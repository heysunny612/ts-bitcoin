import { styled } from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CiDark, CiLight } from 'react-icons/ci';

const Home = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.7rem;
  display: flex;
  justify-content: flex-start;

  svg {
    background-color: ${(props) => props.theme.accentColor};

    color: ${(props) => props.theme.darkAccent};
    padding: 0.5rem;
    border-radius: 100%;
    border: 2px solid transparent;
    border-color: ${(props) => props.theme.darkAccent};
    transition: all 200ms ease-in;
    font-size: 3rem;
    margin: 0 0.5rem;
    cursor: pointer;

    &:hover {
      background-color: ${(props) => props.theme.accentColor};
      color: ${(props) => props.theme.darkAccent};
      border-color: ${(props) => props.theme.darkAccent};
      transform: scale(1.09);
    }
  }
`;

interface HeaderProps {
  dark: string;
  setDark: React.Dispatch<React.SetStateAction<string>>;
}

export default function Header({ dark, setDark }: HeaderProps) {
  const toggleTheme = () => {
    if (dark === 'dark') {
      setDark('light');
      localStorage.theme = 'light';
    } else {
      setDark('dark');
      localStorage.theme = 'dark';
    }
  };
  return (
    <Home>
      <Link to='/'>
        <AiOutlineHome />
      </Link>
      {dark === 'dark' ? (
        <CiDark onClick={toggleTheme} />
      ) : (
        <CiLight onClick={toggleTheme} />
      )}
    </Home>
  );
}
