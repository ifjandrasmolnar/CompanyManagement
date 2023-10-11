import Home  from "./components/Home";
import Counter from "./components/Counter";
import FetchData from "./components/FetchData";

const AppRoutes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    }
];
export default AppRoutes;