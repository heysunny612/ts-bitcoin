import ReactLoading from 'react-loading';
import { styled } from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding-top: 2rem;
`;
export default function Loading() {
  return (
    <Wrapper>
      <ReactLoading type='spin' color='grey' height={50} width={50} />
    </Wrapper>
  );
}
