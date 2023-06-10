import { styled } from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { CiDark, CiLight } from 'react-icons/ci';
import { isDarkAtom } from '../atoms';
import { useSetRecoilState, useRecoilValue } from 'recoil';

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

export default function Header() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const isDark = useRecoilValue(isDarkAtom);
  const toggleTheme = () => {
    isDark ? (localStorage.theme = 'dark') : (localStorage.theme = 'light');
    setDarkAtom((prev) => !prev);
  };

  return (
    <Home>
      <Link to='/'>
        <AiOutlineHome />
      </Link>

      {isDark ? (
        <CiDark onClick={toggleTheme} />
      ) : (
        <CiLight onClick={toggleTheme} />
      )}
    </Home>
  );
}
