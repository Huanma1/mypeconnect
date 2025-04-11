<!DOCTYPE html>
<html>
<head>
    <title>Registrar Mype</title>
</head>
<body>
    <h1>Registrar Mype</h1>

    @if (session('success'))
        <p style="color: green;">{{ session('success') }}</p>
    @endif

    <form method="POST" action="{{ route('mypes.store') }}">
        @csrf
        <input type="text" name="name" placeholder="Nombre" required>
        <input type="email" name="email" placeholder="Correo Electrónico" required>
        <input type="password" name="password" placeholder="Contraseña" required>
        <input type="password" name="password_confirmation" placeholder="Confirmar Contraseña" required>
        <input type="text" name="phone_number" placeholder="Teléfono">
        <input type="text" name="mype_address" placeholder="Dirección" required>
        <textarea name="mype_description" placeholder="Descripción"></textarea>
        <button type="submit">Registrar</button>
    </form>
    
    @if ($errors->any())
    <div class="alert alert-danger">
        <ul>
            @foreach ($errors->all() as $error)
                <li>{{ $error }}</li>
            @endforeach
        </ul>
    </div>
    @endif
</body>
</html>