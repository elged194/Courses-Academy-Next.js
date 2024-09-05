import Image from "next/image";
import ActionsProduct from "../ActionsProduct";
import "../productItem.css";

async function getProductsItems(url) {
  try {
    const res = await fetch(url, {
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch product data");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}

const ProductItem = async ({ params }) => {
  // ---- / Get Product Data /-----
  const data = await getProductsItems(
    `http://localhost:4000/products/${params.id}`
  );

  if (!data) {
    return <p>Failed to load product data.</p>;
  }

  return (
    <section className="productItem">
      <article>
        <figure>
          <Image src={data.image} alt={data.title} width={500} height={300} />
        </figure>

        <div className="productItemDetel">
          <div>
            <h3>{data.title}</h3>
            <h5>${data.price}</h5>

            <div className="ratings">
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star"></i>
              <i className="bx bxs-star-half"></i>
            </div>
            <p>Course • Mindful Mike</p>
            <p>{data.description}</p>
          </div>

          <ActionsProduct data={data} />
        </div>
      </article>
    </section>
  );
};

export default ProductItem;
