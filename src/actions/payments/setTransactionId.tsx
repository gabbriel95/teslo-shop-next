"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const setTransactionId = async (
  transactionId: string,
  orderId: string
) => {
  const session = await auth();

  if (!session?.user) {
    return {
      ok: false,
      message: "Debe de estar autenticado",
    };
  }

  try {
    const order = await prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        paypalTransactionId: transactionId,
      },
    });

    if (!order) {
      return {
        ok: false,
        message: `No se encontro una orden con la id ${orderId}`,
      };
    }

    return {
      ok: true,
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo actualizar el Id de la transacion",
    };
  }
};
