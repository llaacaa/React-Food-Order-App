import useHttp from "../hooks/useHttp";
import Button from "./UI/Button";
import Input from "./UI/Input";

const requestConfig = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
};

export default function Checkout({ totalAmount, closeModal, allItems }) {
  const {
    data,
    isLoading: isSending,
    error,
    sendRequest,
  } = useHttp("http://localhost:3000/orders", requestConfig);

  function handleSubmit(evt) {
    evt.preventDefault();

    const fd = new FormData(evt.target);
    const customerData = Object.fromEntries(fd.entries());

    sendRequest(
      JSON.stringify({
        order: {
          items: allItems,
          customer: customerData,
        },
      })
    );
  }

  let actions = (
    <>
      <Button textOnly type="button" onClick={closeModal}>
        Close
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  if (isSending) {
    actions = <span>Sending order data...</span>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Checkout</h2>
      <p>Total Amount: {totalAmount}</p>

      <Input label="Full Name" type="text" id="name" />
      <Input label="Email Address" type="email" id="email" />
      <Input label="Street" type="text" id="street" />
      <div className="control-row">
        <Input label="Postal Code" type="text" id="postal-code" />
        <Input label="City" type="text" id="city" />
      </div>

      {error && <Error title="Failed to submit order" message={error} />}

      <p className="modal-actions">{actions}</p>
    </form>
  );
}
