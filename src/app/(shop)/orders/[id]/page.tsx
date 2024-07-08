import Link from "next/link";

import { Title } from "@/components";
import { initialData } from "@/seed/seed";
import Image from "next/image";
import { IoCardOutline } from "react-icons/io5";
import clsx from "clsx";

const productInCart = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

interface Props {
  params: {
    id: string;
  };
}

export default function OrderByIdPage({ params }: Props) {
  const { id } = params;

  // TODO: verificar
  // redirect()

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/*Carrito */}

          <div className="flex flex-col mt-5">
            <div
              className={clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  "bg-red-500": false,
                  "bg-green-700": true,
                }
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">Pendiente de pago</span>
              {/*<span className="mx-2">Pendiente de pago</span>*/}
            </div>
            {/*Items */}
            {productInCart.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={product.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-bold">Subtotal: ${product.price * 3}</p>
                </div>
              </div>
            ))}
          </div>

          {/*Checkout - resumen de orden*/}

          <div className="bg-white rounded-r-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2">Direccion de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">Fernando Herrera</p>
              <p>Av. SIempre viva 123</p>
              <p>Col.centro</p>
              <p>Alcaldia test</p>
              <p>Ciudad de buenos aires</p>
              <p>CP 1991</p>
              <p>123.123.123</p>
            </div>

            {/*Divider */}

            <div className="w-full h-0.5 rounded bg-gray-200 mb-10 " />

            <h2 className="text-2xl mb-02">Resumen de orden</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 articulos</span>

              <span>Subtotal</span>
              <span className="text-right">$100</span>

              <span>Impuestos(15%)</span>
              <span className="text-right">$100</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$100</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              <div
                className={clsx(
                  "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                  {
                    "bg-red-500": false,
                    "bg-green-700": true,
                  }
                )}
              >
                <IoCardOutline size={30} />
                <span className="mx-2">Pendiente de pago</span>
                {/*<span className="mx-2">Pendiente de pago</span>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
