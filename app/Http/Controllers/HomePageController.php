<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index()
    {
        // Fetch expenses data for the logged-in user
        $expensesData = DB::table('expenses')
            ->join('categories', 'expenses.category_id', '=', 'categories.id') // Join the categories table
            ->select('categories.name as category', DB::raw('SUM(expenses.amount) as amount')) // Select category name
            ->where('expenses.user_id', Auth::id()) // Only include data for the current user
            ->groupBy('categories.name') // Group by category name
            ->get()
            ->toArray(); // Ensure it's an array

        // Fetch categories data for the logged-in user
        $categoriesData = DB::table('categories')
            ->select('name', DB::raw('COUNT(*) as count'))
            ->where('user_id', Auth::id()) // Only include data for the current user
            ->groupBy('name')
            ->get()
            ->toArray(); // Ensure it's an array

        return Inertia::render('HomePage', [
            'expensesData' => $expensesData,
            'categoriesData' => $categoriesData,
        ]);
    }
}