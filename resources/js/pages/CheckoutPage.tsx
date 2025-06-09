import { useForm } from '@inertiajs/react';

const CheckoutPage = ({ cartItems }: { cartItems: any[] }) => {
  const { data, setData, post } = useForm({
    customer_name: '',
    email: '',
    phone: '',
    items: cartItems,
  });

  const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/orders');
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Lista de productos */}
      {cartItems.map((item) => (
        <div key={item.id}>
          Producto: {item.name} <br />
          Cantidad: {item.quantity} - ${item.price} <br />

        </div>
      ))}
      <div>
        <strong>Total a pagar: ${total.toLocaleString()}</strong>
      </div>

      {/* Formulario */}
      <input placeholder="Nombre" onChange={e => setData('customer_name', e.target.value)} />
      <input placeholder="Correo" onChange={e => setData('email', e.target.value)} />
      <input placeholder="Teléfono" onChange={e => setData('phone', e.target.value)} />
      <button type="submit">Confirmar Pedido</button>
    </form>
  );
};

export default CheckoutPage;
