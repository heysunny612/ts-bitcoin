# 리액트 프로젝트 코인 가격 확인 사이트 

![1](https://github.com/heysunny612/ts-bitcoin/assets/127499117/9ee7355f-fcdf-4dba-a54a-aa762994469e)


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

![2](https://github.com/heysunny612/ts-bitcoin/assets/127499117/710554b7-e8b6-456a-9dfd-6be7da6957dd)


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
        mode: isDark ? 'dark' : 'light',
      },
      chart: {
        type: 'candlestick',
        width: 300,
        height: 300,
        toolbar: { show: false },
        background: '#f9fafc',
      },
      xaxis: {
        labels: { show: true },
        axisTicks: { show: false },
        axisBorder: { show: false },
        tooltip: { enabled: true },
      },
      yaxis: {
        tooltip: {
          enabled: true,
        },
      },
      stroke: { curve: 'smooth', width: 4 },
      grid: { show: false },
      tooltip: { y: { formatter: (value) => `${value.toFixed(2)}` } },
    }}
  />
)}
```

<br/>

| 제목 | 설명 |
| --- | --- |
| 구현 사항 | -코인파프리카 API 사용 동영상 불러오기 <br/> -filter, sort 메소드를 사용하여 높은 가격순 구현 <br/> -Styled-components + recoil을 이용한 theme 구현<br/> -ApexChart 라이브러리를 사용한 차트 구현 <br/> -React-router-dom을 사용하여 탭 UI 구현|
| 라이브러리 | axios, react-query, styled-components,react-apexcharts,react-router-dom, recoil |
| css 및 반응형  | Styled-components사용 , 반응형 구현 , 타입스크립트 적용 |
| 배포 주소  | Netlify [https://sunny-bit.netlify.app/](https://sunny-bit.netlify.app/) |
| 소스 코드  | Github  [ https://github.com/heysunny612/react_youtube ](https://github.com/heysunny612/ts-bitcoin)|


