<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ExpenseController extends Controller
{
    public function index(Request $request)
    {
        $userId = Auth::id();

    // Retrieve filter inputs from the request
    $day = $request->query('day'); 
    $month = $request->query('month');
    $year = $request->query('year');

    // Prepare query for expenses
    $query = Expense::where('user_id', $userId)->with('category');

    // Apply filters dynamically
    if (!empty($day)) {
        $query->whereDay('date', $day);
    }
    if (!empty($month)) {
        $query->whereMonth('date', $month);
    }
    if (!empty($year)) {
        $query->whereYear('date', $year);
    }

    $expenses = $query->orderBy('date', 'desc')->get();

    $categories = Auth::user()->categories()->get();

    return Inertia::render('Expenses/Index', [
        'expenses' => $expenses,
        'categories' => $categories,
        'filters' => [
            'day' => $day,
            'month' => $month,
            'year' => $year,
        ],
    ]);
    }

    public function create()
    {
        $categories = Auth::user()->categories()->pluck('name', 'id');
        return Inertia::render('Expenses/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
        ]);

        $category = Auth::user()->categories()->findOrFail($request->category_id);

        Auth::user()->expenses()->create([
            'title' => $request->title,
            'amount' => $request->amount,
            'date' => $request->date,
            'category_id' => $category->id,
        ]);

        return redirect()->route('expenses.index')->with('success', 'Expense created successfully.');
    }

    public function edit(Expense $expense)
    {
        if($expense->user_id !== Auth::id()){
            abort(403, 'Forbidden');
        }

        $categories = Auth::user()->categories()->pluck('name', 'id');

        return Inertia::render('Expenses/Edit', [
            'expense' => $expense,
            'categories' => $categories,
        ]);
    }

    public function update(Request $request, Expense $expense)
    {
        if($expense->user_id !== Auth::id()){
            abort(403, 'Forbidden');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
        ]);

        $expense->update($request->only('title', 'amount', 'date', 'category_id'));

        return redirect()->route('expenses.index')->with('success', 'Expense updated successfully.');
    }

    public function destroy(Expense $expense)
    {
       if($expense->user_id !== Auth::id()){
        abort(403, 'Forbidden');
       }

        $expense->delete();

        return redirect()->route('expenses.index')->with('success', 'Expense deleted successfully.');
    }
}