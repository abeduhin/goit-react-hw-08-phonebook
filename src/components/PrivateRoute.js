import { useAuth } from "redux/hooks/useAuth";
import { Navigate } from "react-router-dom";


export const PrivateRoute = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn, isRefreshing } = useAuth();
    const shouldRedirect = !isLoggedIn && !isRefreshing;

    return shouldRedirect ? <Navigate to={redirectTo} /> : Component;
};
// Якщо маршрут приватний і користувач увійшов у систему, відтворіть компонент
// В іншому випадку рендерим <Navigate> для перенаправлення