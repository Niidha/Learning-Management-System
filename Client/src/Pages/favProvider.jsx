import { createContext, useContext, useState } from "react";

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favoritesList, setFavoritesList] = useState([]);

    const contextValues = {
        favoritesList, 
        setFavoritesList
    };

    return (
        <FavoritesContext.Provider value={contextValues}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => {
    return useContext(FavoritesContext);
};
