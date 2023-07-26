import axios from "axios";
// import { useQuery } from "react-query";

export async function AllPayments() {
  const a = await axios
    .get("https://api.mercadopago.com/merchant_orders/search", {
      params: {},
      headers: {
        authorization:
          "Bearer APP_USR-6224878114061378-071003-98d48a2185ebf86cf3f9bd60a4a2fc02-513614546",
      },
    })
    .then((e) => {
      console.log(e);
    })
    .catch((e) => {
      console.log(e);
    });



  return <div>ddddddddddd</div>;
}
