"use server";

import { auth } from "@/auth.config";
import type { Address, Size } from "@/interfaces";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  size: Size;
}

const TAX = 0.15;

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address
) => {
  const session = await auth();
  const userId = session?.user.id;

  console.log(address);

  // Verificar sesion de usuario
  if (!userId) {
    return {
      ok: false,
      message: "No hay session de usuario",
    };
  }

  // Obtener informacion de los productos (podemos llevar +2 productos con el mismo id, diferente talles)

  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((p) => p.productId),
      },
    },
  });

  // calcular los montos // Encabezado
  const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);

  // Totales de tax, subtotal, total
  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity;
      const product = products.find((product) => product.id === item.productId);

      if (!product) throw new Error(`${item.productId} no existe - 500`);

      const subTotal = product.price * productQuantity;

      totals.subTotal += subTotal;
      totals.tax += subTotal * TAX;
      totals.total += subTotal + subTotal * TAX;

      return totals;
    },
    { subTotal: 0, tax: 0, total: 0 }
  );

  // Crear la transaccion en BD

  const prismaTx = await prisma.$transaction(async (tx) => {
    // 1. Actualizar el stock de los productos
    // 2. Crear la orden - Encabezado - Detalle

    const order = await tx.order.create({
      data: {
        userId: userId,
        itemsInOrder: itemsInOrder,
        subTotal: subTotal,
        tax: tax,
        total: total,
        OrderItem: {
          createMany: {
            data: productIds.map((p) => ({
              quantity: p.quantity,
              size: p.size,
              productId: p.productId,
              price:
                products.find((product) => product.id === p.productId)?.price ??
                0,
            })),
          },
        },
      },
    });

    // Validar, si el price es cero, lanzar un error

    // 3. Crear la direccion de la orden
    // Address

    const { country, ...restAddress } = address;

    const orderAddress = await tx.orderAddress.create({
      data: {
        ...restAddress,
        countryId: country,
        orderId: order.id,
      },
    });

    return {
      order: order,
      updatedProducts: [],
      orderAddress: orderAddress,
    };
  });
};
