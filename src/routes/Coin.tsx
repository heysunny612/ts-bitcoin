import { NavLink, Outlet, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Title from '../components/Title';
import { useQuery } from 'react-query';
import { fetchCoinsInfo } from '../api/coins';
import { ICoinInfo } from '../type/interfaces';
import moment from 'moment';
import Loading from '../components/Loading';

const CoinArticle = styled.article`
  display: flex;
  gap: 2rem;
`;

const Table = styled.table`
  width: 100%;
  text-align: left;
  font-size: 13px;

  thead {
    border-top: 1px solid #dddddd;
  }

  th {
    vertical-align: middle;
    padding: 0.8rem;
    font-weight: bold;
    background-color: ${(props) => props.theme.bgTable};
    border-bottom: 1px solid #eeeeee;
    color: ${(props) => props.theme.textColor};
  }
  td {
    vertical-align: middle;
    padding: 0.8rem;
    border-bottom: 1px solid #eeeeee;
    line-height: 1.5;
    color: #333;
  }
`;

const Links = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 0 0.5rem;
  width: 100%;
`;

const TapWarpper = styled.div`
  margin: 2rem;
  article {
    padding: 1rem;
    border: 1px solid #eaeaea;
    border-top: 0 none;
  }
`;

const TapMenu = styled.div`
  display: flex;

  a {
    display: block;
    flex: 1 1 50%;
    padding: 0.7rem;
    text-align: center;
    border: 1px solid #093687;
    font-size: 1.4rem;
    transition: all 200ms ease-in-out;
    background-color: ${(props) => props.theme.bgTable};

    &:first-child {
      border-right: 0 none;
    }
    &.active {
      background-color: #093687;
      color: #fff;
    }
  }
`;
export default function Coin() {
  const { coinId } = useParams();
  const {
    isLoading,
    error,
    data: info,
  } = useQuery<ICoinInfo>(['coinInfo', coinId], () =>
    fetchCoinsInfo(coinId as unknown as string)
  );

  return (
    <>
      {isLoading && <Loading />}
      {error && <p>OOPS! TRY AGAIN</p>}
      <Title title={`${info?.name} 정보`} />
      {info && (
        <CoinArticle>
          <Table>
            <colgroup>
              <col width='150px' />
              <col />
              <col width='115px' />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Description</th>
                <td colSpan={3}>{info?.description}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Logo</th>
                <td>
                  <img src={info.logo} alt={info.name} width={50} />
                </td>
                <th>Symbol</th>
                <td>{info?.symbol}</td>
              </tr>
              <tr>
                <th>Proof Type</th>
                <td>{info?.proof_type}</td>
                <th>Hash Algorithm</th>
                <td>{info?.hash_algorithm}</td>
              </tr>
              <tr>
                <th>First Date At</th>
                <td>
                  {moment(info?.first_data_at).utc().format('YYYY-MM-DD')}
                </td>
                <th>Started At</th>
                <td>{moment(info?.started_at).utc().format('YYYY-MM-DD')}</td>
              </tr>
            </tbody>
          </Table>
          <Table>
            <colgroup>
              <col width='150px' />
              <col />
            </colgroup>
            <thead>
              <tr>
                <th>Links</th>
                <td>
                  <Links>
                    {info?.links_extended.map(({ url, type }, idx) => (
                      <li key={idx}>
                        [
                        <a href={url} target='_blank'>
                          {type}
                        </a>
                        ]
                      </li>
                    ))}
                  </Links>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Team</th>
                <td>
                  <ul>
                    {info?.team.slice(0, 10).map(({ name, position }, idx) => (
                      <li key={idx}>
                        <b>[{position}]</b> {name}
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </Table>
        </CoinArticle>
      )}
      <TapWarpper>
        <TapMenu>
          <NavLink
            to='chart'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Chart
          </NavLink>
          <NavLink
            to='price'
            className={({ isActive }) => (isActive ? 'active' : '')}
          >
            Price
          </NavLink>
        </TapMenu>
        <article>
          <Outlet context={{ coinId }} />
        </article>
      </TapWarpper>
    </>
  );
}
