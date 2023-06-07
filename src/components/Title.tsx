import { styled } from 'styled-components';

const H1 = styled.h1`
  padding: 1.5rem;
  font-weight: bold;
  font-size: 1.2rem;
`;

//TODO : TS 적용

export default function Title({ title }) {
  return <H1>{title}</H1>;
}
