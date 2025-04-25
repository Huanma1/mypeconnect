<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('mype_products', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('mype_id')->constrained()->onDelete('restrict');
            $table->foreignId('product_id')->constrained()->onDelete('restrict');
            $table->integer('custom_price')->nullable(); // Este campo es para el precio personalizado de cada mype
            $table->integer('stock')->default(0);
            $table->decimal('product_rate')->default(0);
            $table->integer('min_stock')->default(5)->after('stock');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mype_products');
    }
};
