import { Box, Button, Grid, Typography } from "@mui/material";
import { Order } from "../../app/layout/models/order";
import BasketTable from "../basket/BasketTable";
import { BasketItem } from "../../app/layout/models/basket";
import BasketSummary from "../basket/BasketSummasry";
import { isTemplateExpression } from "typescript";
import ReturnOrderedItem from "../orders/VracenaNarudzba";
import Orders from "../orders/Orders";
import { useState } from "react";
import axios from "axios";
import VracenaNarudzba from "../orders/VracenaNarudzba";

interface Props {
  order: Order;
  setSelectedOrder: (id: number) => void;
}
export default function PregledNarudzbe({ order, setSelectedOrder }: Props) {
  const subtotal =
    order.orderItems.reduce(
      (sum, item) => sum + item.kolicina * item.cijena,
      0
    ) ?? 0;
  {
    console.log(order.orderItems);
  }

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography sx={{ p: 2 }} gutterBottom variant="h4">
          Order#{order.bUyerId} -{order.orderStatus}
        </Typography>
        <Button
          onClick={() => setSelectedOrder(0)}
          sx={{ m: 2 }}
          size="large"
          variant="contained"
        >
          Vrati se nazad
        </Button>
      </Box>
      <BasketTable
        days={order.days}
        items={order.orderItems}
        isBasket={false}
        isOrder={true}
      />
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary subtotal={subtotal} />
        </Grid>
      </Grid>
    </>
  );
}
