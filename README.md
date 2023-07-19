# 리액트 프로젝트 코인 가격 확인 사이트 

<p align="center">
    <img src="https://github.com/heysunny612/ts-bitcoin/assets/127499117/9ee7355f-fcdf-4dba-a54a-aa762994469e" alt="1">
</p>

<br/>

## Styled-components + recoil을 이용한 theme 구현

 <br/>

```js
import { atom } from 'recoil';

//Recoil을 사용하여 theme 상태 전역으로 관리
//atom.ts
export const isDarkAtom = atom({
  key: 'isDark',
  default: false,
});

//Header.tsx
const setDarkAtom = useSetRecoilState(isDarkAtom);
const isDark = useRecoilValue(isDarkAtom);
const toggleTheme = () => {
    isDark ? (localStorage.theme = 'dark') : (localStorage.theme = 'light');
    setDarkAtom((prev) => !prev);
 };


```

<br/>
<br/>

<p align="center">
    <img src="https://github.com/heysunny612/ts-bitcoin/assets/127499117/710554b7-e8b6-456a-9dfd-6be7da6957dd" alt="2">
</p>


<br/>

## ApexChart 라이브러리를 사용한 차트 구현

```js
 <ReactApexChart
    type='candlestick'
    series={[
      {
        name: 'price',
        data: data.map((price) => ({
          x: new Date(price.time_close * 1000).toISOString().slice(2, 10),
          y: [price.open, price.high, price.low, price.close],
        })),
      },
    ]}
    options={{
      theme: {
        mode: isDark ? 'dark' : 'ligh보 불러오기 <br/> -filter, sort 메소드를 사용하여 높은 가격순 구현 <br/> -Styled-components + recoil을 이용한 theme 구현<br/> -ApexChart 라이브러리를 사용한 차트 구현 <br/> -React-router-dom을 사용하여 탭 UI 구현|
| 라이브러리 | axios, react-query, styled-components,react-apexcharts,react-router-dom, recoil |
| css 및 반응형  | Styled-components사용 , 반응형 구현 , 타입스크립트 적용 |
| 배포 주소  | Netlify [https://sunny-bit.netlify.app/](https://sunny-bit.netlify.app/) |
| 소스 코드  | Github  [ https://github.com/heysunny612/react_youtube ](https://github.com/heysunny612/ts-bitcoin)|


