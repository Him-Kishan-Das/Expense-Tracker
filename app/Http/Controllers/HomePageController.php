<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomePageController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();

        // Retrieve filter inputs from the request
        $day = $request->query('day'); 
        $month = $request->query('month');
        $year = $request->query('year');

        try {
            // Prepare query for expenses
            $query = DB::table('expenses')
                ->join('categories', 'expenses.category_id', '=', 'categories.id')
                ->where('expenses.user_id', $userId);

            // Apply filters using SQL functions to extract day, month, and year from the DATE field
            if (!empty($day)) {
                $query->where(DB::raw('DAY(expenses.date)'), $day);
            }

            if (!empty($month)) {
                $query->where(DB::raw('MONTH(expenses.date)'), $month);
            }

            if (!empty($year)) {
                $query->where(DB::raw('YEAR(expenses.date)'), $year);
            }

            // Get filtered expenses data for the charts
            $expensesData = $query
                ->select('categories.name as category', DB::raw('SUM(expenses.amount) as amount'))
                ->groupBy('categories.name')
                ->get()
                ->toArray();

            // Fetch categories data based on filters
            $categoriesData = DB::table('categories')
                ->leftJoin('expenses', 'categories.id', '=', 'expenses.category_id')
                ->select('categories.name', DB::raw('COUNT(expenses.id) as count'))
                ->where('categories.user_id', $userId)
                ->when($day, function ($query, $day) {
                    return $query->where(DB::raw('DAY(expenses.date)'), $day);
                })
                ->when($month, function ($query, $month) {
                    return $query->where(DB::raw('MONTH(expenses.date)'), $month);
                })
                ->when($year, function ($query, $year) {
                    return $query->where(DB::raw('YEAR(expenses.date)'), $year);
                })
                ->groupBy('categories.name')
                ->get()
                ->toArray();

            return Inertia::render('HomePage', [
                'expensesData' => $expensesData,
                'categoriesData' => $categoriesData,
                'filters' => [
                    'day' => $day,
                    'month' => $month,
                    'year' => $year,
                ],
            ]);
        } catch (\Exception $e) {
            // Redirect to the homepage with a flash error message
            return redirect()->route('home')->with('error', 'There was a problem processing your filters. Please try again.');
        }
    }
}