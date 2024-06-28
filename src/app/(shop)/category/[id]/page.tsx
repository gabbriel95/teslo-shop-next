import { notFound } from "next/navigation";
import { initialData } from "@/seed/seed";
import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";

interface Props {
  params: {
    id: Category;
  };
}

const allProducts = initialData.products;

export default function ({ params }: Props) {
  const { id } = params;

  const products = allProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  /*if (id === "kids") {
    notFound();
  }*/

  return (
    <>
      <Title
        title={`Articulos ${labels[id]}`}
        subtitle="Todos los articulos"
        className="mb-2"
      />
      <ProductGrid products={products} />
    </>
  );
}
