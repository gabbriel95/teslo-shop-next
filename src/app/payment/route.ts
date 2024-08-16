import { NextRequest } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_SECRET_KEY!,
});

export async function POST(request: NextRequest) {
  const body = await request
    .json()
    .then((data) => data as { data: { id: string } });

  const payment = await new Payment(client);


  payment
    .get({
      id: body.data.id,
    })
    .then(console.log)
    .catch(console.log);

  return Response.json({ success: true });
}
