import { styled } from 'styled-components';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Home = styled.div`
  position: absolute;
  right: 1rem;
  top: 0.7rem;
  display: flex;
  justify-content: flex-start;
  a {
    background-color: #093687;
    color: #ffffff;
    padding: 0.5rem;
    border-radius: 100%;
    border: 2px solid transparent;
    transition: all 200ms ease-in;

    &:hover {
      background-color: #ffffff;
      color: #093687;
      border-color: #093687;
      transform: scale(1.09);
    }
  }
  svg {
    font-size: 1.5rem;
  }
`;

export default function Header() {
  return (
    <Home>
      <Link to='/'>
        <AiOutlineHome />
      </Link>
    </Home>
  );
}
