<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InventoryHistory extends Model
{
    protected $fillable = [
        'mype_id',
        'product_id',
        'cantidad_cambiada',
        'tipo_cambio',
        'comentario',
    ];

    public function mype()
    {
        return $this->belongsTo(Mype::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}