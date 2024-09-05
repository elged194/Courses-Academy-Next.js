import "./FavoriteProducts.css";
import Favoriteproducts from "./favoriteproducts";

const FavoriteProducts = () => {
  return (
    <div className="favorite-products-container">
      <h3 className="title" >Favorite Products</h3>

      <section className="products-list">
        <Favoriteproducts />
      </section>
    </div>
  );
};

export default FavoriteProducts;
