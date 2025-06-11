<?php

use App\Http\Controllers\Settings\AppearanceControllerUser;
use App\Http\Controllers\Settings\PasswordController;
use App\Http\Controllers\Settings\PasswordControllerUser;
use App\Http\Controllers\Settings\ProfileController;
use App\Http\Controllers\Settings\ProfileControllerUser;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// RUTAS PARA MYPES (auth:mype)
Route::middleware('auth:mype')->group(function () {
    Route::redirect('settings', 'settings/profile');

    Route::get('settings/profile', [ProfileController::class, 'edit'])->name('mype.profile.edit');
    Route::patch('settings/profile', [ProfileController::class, 'update'])->name('mype.profile.update');
    Route::delete('settings/profile', [ProfileController::class, 'destroy'])->name('mype.profile.destroy');

    Route::get('settings/password', [PasswordController::class, 'edit'])->name('mype.password.edit');
    Route::put('settings/password', [PasswordController::class, 'update'])->name('mype.password.update');

    Route::get('settings/appearance', function () {
        return Inertia::render('settings/appearance');
    })->name('mype.appearance');
});

// RUTAS PARA USUARIOS CLIENTES (auth)
Route::middleware('auth')->group(function () {
    Route::redirect('settingsUser', 'settingsUser/profile');

    Route::get('settingsUser/profile', [ProfileControllerUser::class, 'edit'])->name('user.profile.edit');
    Route::patch('settingsUser/profile', [ProfileControllerUser::class, 'update'])->name('user.profile.update');
    Route::delete('settingsUser/profile', [ProfileControllerUser::class, 'destroy'])->name('user.profile.destroy');

    Route::get('settingsUser/password', [PasswordControllerUser::class, 'edit'])->name('user.password.edit');
    Route::put('settingsUser/password', [PasswordControllerUser::class, 'update'])->name('user.password.update');

    Route::get('/settingsUser/appearance', [AppearanceControllerUser::class, 'edit'])->name('user.appearance');
    Route::put('/settingsUser/appearance', [AppearanceControllerUser::class, 'update'])->name('user.appearance.update');
});
