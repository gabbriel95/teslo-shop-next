"use client";

import { paymentMercadoPago } from "@/actions";
import React from "react";

interface ButtonMercadoPagoProps {
  children: React.ReactNode;
  orderId: string;
  amount: number;
  quantity: number;
}

export const ButtonMercadoPago: React.FC<ButtonMercadoPagoProps> = ({
  children,
  orderId,
  amount,
  quantity,
}) => {
  const onPaymentClick = () => {
    paymentMercadoPago(orderId, quantity, amount);
  };

  return <button onClick={onPaymentClick}>{children}</button>;
};
