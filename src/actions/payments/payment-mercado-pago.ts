"use server";

import { MercadoPagoConfig, Preference } from "mercadopago";
import { redirect } from "next/navigation";
import { setTransactionId } from "./setTransactionId";

export const paymentMercadoPago = async (
  orderId: string,
  quantity: number,
  amount: number
) => {
  const client = new MercadoPagoConfig({
    accessToken: process.env.MERCADO_PAGO_SECRET_KEY!,
  });

  const preference = await new Preference(client).create({
    body: {
      items: [
        {
          id: orderId,
          title: `Orden ${orderId}`,
          quantity: quantity,
          unit_price: amount,
        },
      ],
    },
  });

  await setTransactionId(preference.id!, orderId);

  redirect(preference.sandbox_init_point!);
};
