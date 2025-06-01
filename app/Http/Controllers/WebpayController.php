<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Transbank\Webpay\WebpayPlus\Transaction;

class WebpayController extends Controller
{
    public function create(Request $request)
    {
        $transaction = new Transaction();

        $response = $transaction->create(
            uniqid(), // buyOrder
            uniqid(), // sessionId
            $request->input('amount'), // monto
            route('webpay.callback') // returnUrl
        );

        // Redirige al usuario a Webpay
        return redirect($response->getUrl() . '?token_ws=' . $response->getToken());
    }

    public function callback(Request $request)
    {
        $transaction = new Transaction();
        $result = $transaction->commit($request->get('token_ws'));

        // Aquí puedes validar el pago y mostrar el resultado
        if ($result->isApproved()) {
            return view('webpay.success', ['result' => $result]);
        } else {
            return view('webpay.failed', ['result' => $result]);
        }
    }
}