<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property int $mype_id
 * @property int $product_id
 * @property int $cantidad_cambiada
 * @property string $tipo_cambio
 * @property string|null $comentario
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Mype $mype
 * @property-read \App\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory whereCantidadCambiada($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory whereComentario($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory whereMypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory whereTipoCambio($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|InventoryHistory whereUpdatedAt($value)
 */
	class InventoryHistory extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $name
 * @property string $email
 * @property string|null $email_verified_at
 * @property string $password
 * @property string|null $phone_number
 * @property int|null $mype_rate
 * @property string|null $mype_address
 * @property string|null $mype_description
 * @property string|null $remember_token
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\InventoryHistory> $inventoryHistories
 * @property-read int|null $inventory_histories_count
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Product> $products
 * @property-read int|null $products_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereMypeAddress($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereMypeDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereMypeRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype wherePhoneNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Mype whereUpdatedAt($value)
 */
	class Mype extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property int $mype_id
 * @property int $product_id
 * @property int|null $custom_price
 * @property int $stock
 * @property string $product_rate
 * @property int $min_stock
 * @property-read \App\Models\Product $product
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct whereCustomPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct whereMinStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct whereMypeId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct whereProductId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct whereProductRate($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct whereStock($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|MypeProduct whereUpdatedAt($value)
 */
	class MypeProduct extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $product_name
 * @property string $product_description
 * @property string $category
 * @property-read \Illuminate\Database\Eloquent\Collection<int, \App\Models\Mype> $mypes
 * @property-read int|null $mypes_count
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereCategory($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereProductDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereProductName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Product whereUpdatedAt($value)
 */
	class Product extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

