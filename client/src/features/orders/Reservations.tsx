import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import agent from "../../app/api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order, Reservation } from "../../app/layout/models/order";
import { currencyFormat } from "../../app/util/util";
import OrderDetailed from "./OrderDetailed";
import PregledNarudzbe from "../admin/PregeledNarudzbe";

export default function Reservations() {
  const [orders, setOrders] = useState<Reservation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0);

  useEffect(() => {
    setLoading(true);
    agent.Reservations.list()
      .then((orders) => setOrders(orders))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading orders...." />;

  /*if (selectedOrderNumber > 0)
    return (
      <PregledNarudzbe
        order={orders?.find((o) => o.id === selectedOrderNumber)!}
        setSelectedOrder={setSelectedOrderNumber}
      />
    );*/

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Broj rezervacije</TableCell>
            <TableCell>Kupac</TableCell>
            <TableCell align="right">ID Proizvoda</TableCell>
            <TableCell align="right">Od</TableCell>
            <TableCell align="right">Do</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <TableRow
              key={order.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {order.id}
              </TableCell>
              <TableCell align="left">
                {order.customerName + " - " + order.customerEmail}
              </TableCell>{" "}
              <TableCell align="center">{order.productId}</TableCell>
              <TableCell align="right">
                {order.reservedFrom.split("T")[0]}
              </TableCell>{" "}
              <TableCell align="right">
                {order.reservedTo.split("T")[0]}
              </TableCell>
              <TableCell align="right">
                <Button onClick={() => setSelectedOrderNumber(order.id)}>
                  Pregled
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
