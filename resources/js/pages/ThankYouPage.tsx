import { Link } from '@inertiajs/react';

const ThankYouPage = () => {
    return (
        <div>
            <h1>¡Gracias por tu compra!</h1>
            <p>Tu pedido fue recibido correctamente.</p>
            <Link href="/" className="btn btn-primary" style={{ marginTop: '20px' }}>
                Volver al inicio
            </Link>
        </div>
    );
};

export default ThankYouPage;
