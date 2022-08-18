import React from "react";
import Layout from "./components/layout/Layout";
import MapPage from "./pages/MapPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useRoutes } from "react-router-dom";
import ListPage from "./pages/ListPage";

import MapContainer from "./components/map/MapContainer";

function App() {
  let element = useRoutes([
    { path: "/", element: <MapPage /> },
    { path: "/list", element: <ListPage /> },

    // {
    //   path: "invoices",
    //   element: <Invoices />,
    // 	// 중첩 라우트의 경우도 Route에서와 같이 children이라는 property를 사용
    //   children: [
    //     { path: ":id", element: <Invoice /> },
    //     { path: "sent", element: <SentInvoices /> }
    //   ]
    // },

    // // NotFound 페이지는 다음과 같이 구현할 수 있음
    // { path: "*", element: <NotFound /> }
  ]);

  // element를 return함으로써 적절한 계층으로 구성된 element가 렌더링 될 수 있도록 함
  return element;
}

export default App;
