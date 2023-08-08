import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// import Catalog from "./components/catalog";
import Orders from "./components/orders";
import Favorites from "./components/favorites";
import Cart from "./components/cart";
import Login from "./layouts/login";
import Products from "./layouts/products";
import Main from "./components/page/main";
// import AuthProvider from "./hooks/useAuth";
import Admin from "./layouts/admin";
import Users from "./layouts/users";
import LogOut from "./layouts/logOut";
import ProtectedRoute from "./components/protectedRoute";
import AppLoader from "./components/ui/hoc/appLoader";
import MainMocData from "./components/page/mainMocData";
import ProtectedRouteForAdminPage from "./components/protectedRouteForAdminPage";

function App() {
    return (
        <div>
            <AppLoader>
                {/* <AuthProvider> */}
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/logout" component={LogOut} />
                    {/* <Route path="/catalog" component={Catalog} /> */}
                    <ProtectedRoute path="/orders" component={Orders} />
                    <Route path="/main" component={MainMocData} />
                    <ProtectedRoute path="/cart" component={Cart} />
                    <ProtectedRoute path="/favorites" component={Favorites} />
                    <Route path="/users/:userID?/:edit?" component={Users} />
                    <Route path="/login/:type?" component={Login} />
                    <ProtectedRoute
                        path="/products/:prodId?/:edit?"
                        component={Products}
                    />
                    <ProtectedRouteForAdminPage
                        path="/admin/:edit?/:create?"
                        component={Admin}
                    />
                    <Redirect to="/" />
                </Switch>
                {/* </AuthProvider> */}
            </AppLoader>
        </div>
    );
}

export default App;
