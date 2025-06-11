<!-- resources/views/webpay/form.blade.php -->
<form action="{{ route('webpay.create') }}" method="POST">
    @csrf
    <input type="number" name="amount" placeholder="Monto" required>
    <button type="submit">Pagar con Webpay</button>
</form>