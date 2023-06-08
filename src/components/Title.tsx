import { styled } from 'styled-components';

const H1 = styled.h1`
  padding: 1.5rem;
  font-weight: bold;
  font-size: 1.2rem;
  color: #333333;
`;

interface TitleProps {
  title: string;
}

export default function Title({ title }: TitleProps) {
  return <H1>{title}</H1>;
}
