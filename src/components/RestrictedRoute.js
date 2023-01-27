import { useAuth } from "redux/hooks/useAuth";
import { Navigate } from "react-router-dom";

export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
    const { isLoggedIn } = useAuth();
    return isLoggedIn ? <Navigate to={redirectTo} /> : Component;
};

// Якщо маршрут обмежений і користувач увійшов у систему, рендерим <Navigate> для перенаправлення
// В іншому випадку рендерим компонент