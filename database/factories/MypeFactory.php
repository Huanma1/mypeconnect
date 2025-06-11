<?php

namespace Database\Factories;

use App\Models\Mype;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class MypeFactory extends Factory
{
    protected $model = Mype::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->company(),
            'email' => $this->faker->unique()->safeEmail(),
            'password' => bcrypt('password'),
            'phone_number' => $this->faker->phoneNumber(),
            'mype_rate' => $this->faker->randomFloat(1, 1, 5),
            'mype_address' => $this->faker->address(),
            'mype_description' => $this->faker->paragraph(),
            'remember_token' => Str::random(10),
        ];
    }
}
