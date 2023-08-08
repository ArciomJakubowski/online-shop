import React from "react";
import { useHistory } from "react-router-dom";
import useMockData from "../../utils/mockData";

const MainMocData = () => {
    // const { initialize } = useMockData();
    const history = useHistory();
    const { error, initialize, progress, status } = useMockData();
    const handleClick = () => {
        initialize();
    };
    const handleOpenProductsList = () => {
        history.push("/products");
    };

    return (
        <div>
            <div className="container mt-5">
                <h1>Main Page</h1>
                <h3>Инициализация данных в FireBase</h3>
                <ul>
                    <li>Status:{status}</li>
                    <li>Progress:{progress}%</li>
                    {error && <li>error:{error}</li>}
                </ul>
                <button className="btn btn-primary" onClick={handleClick}>
                    Инициализировать
                </button>
            </div>
            <button onClick={handleOpenProductsList}>Каталог</button>
        </div>
    );
};

export default MainMocData;
