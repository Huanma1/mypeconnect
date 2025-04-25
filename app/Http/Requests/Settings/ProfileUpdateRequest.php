<?php

namespace App\Http\Requests\Settings;

use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProfileUpdateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $mype = $this->user();

        // Verificar que el usuario autenticado sea una instancia de Mype
        if (! $mype instanceof \App\Models\Mype) {
            throw new \Exception('MYPE no autenticado o inválido.');
        }

        return [
            'name' => ['required', 'string', 'max:255'],
            'email' => [
                'required',
                'string',
                'email',
                'max:255',
                Rule::unique('mypes', 'email')->ignore($mype->id), // Validar email único para MYPE
            ],
            'phone_number' => ['nullable', 'string', 'max:15'],
            'mype_address' => ['nullable', 'string', 'max:255'],
            'mype_description' => ['nullable', 'string'],
        ];
    }
}
