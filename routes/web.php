<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ExpenseController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Welcome Page Route
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

// Dashboard Route
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Profile Routes
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Categories Routes
Route::middleware('auth')->group(function () {
    // Display the categories page
    Route::get('/categories', [CategoryController::class, 'index'])->name('categories.index');

    // Create a new category (form submission)
    Route::post('/categories', [CategoryController::class, 'store'])->name('categories.store');

    // Edit an existing category (show edit form)
    Route::get('/categories/{category}/edit', [CategoryController::class, 'edit'])->name('categories.edit');

    // Update an existing category (form submission)
    Route::patch('/categories/{category}', [CategoryController::class, 'update'])->name('categories.update');

    // Delete a category
    Route::delete('/categories/{category}', [CategoryController::class, 'destroy'])->name('categories.destroy');
});

// Expenses Routes
Route::middleware('auth')->group(function () {
    // Display the expenses page
    Route::get('/expenses', [ExpenseController::class, 'index'])->name('expenses.index');

    // Create a new expense (form submission)
    Route::post('/expenses', [ExpenseController::class, 'store'])->name('expenses.store');

    // Edit an existing expense (show edit form)
    Route::get('/expenses/{expense}/edit', [ExpenseController::class, 'edit'])->name('expenses.edit');

    // Update an existing expense (form submission)
    Route::patch('/expenses/{expense}', [ExpenseController::class, 'update'])->name('expenses.update');

    // Delete an expense
    Route::delete('/expenses/{expense}', [ExpenseController::class, 'destroy'])->name('expenses.destroy');
});

// Authentication Routes
require __DIR__.'/auth.php';