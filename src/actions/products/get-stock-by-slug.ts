"use server";

import prisma from "@/lib/prisma";
//import { sleep } from "@/utils";

export const getStockBySlug = async (slug: string): Promise<number> => {
  try {
    //await sleep(3);
    const stock = await prisma.product.findFirst({
      select: {
        inStock: true,
      },
      where: {
        slug,
      },
    });

    return stock?.inStock ?? 0;
  } catch (error) {
    return 0;
    // Enviar a pagina error 404.
  }
};
