<?php

namespace App\Http\Controllers;

use App\Models\Expense;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ExpenseController extends Controller
{
    public function index(){
        $expenses = Auth::user()->expenses()->with('category')->get();
        return response()->json($expenses);
    }

    public function store(Request $request){
        $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'requred|numeric|min:0',
            'date' => 'requried|date',
            'category_id' => 'required|exist:categories,id',
        ]);

        $category = Auth::user()->categories()->findOrFail($request->category_id);

        $expense = Auth::user()->expenses()->create([
            'title' => $request->title,
            'amount' => $request->amount,
            'date' => $request->date,
            'category_id' => $category->id,
        ]);

        return response()->json(['message' => 'Expense created Sucessfully', 'expense' => $expense]);
    }

    public function update(Request $request, Expense $expense){
        $this->authorize('update', $expense);

        $request->validate([
            'title' => 'required|string|max:255',
            'amount' => 'required|numeric|min:0',
            'date' => 'required|date',
            'category_id' => 'required|exists:categories,id',
        ]);

        $category = Auth::user()->categories()->findOrFail($request->category_id);

        $expense->update([
            'title' => $request->title,
            'amount' => $request->amount,
            'date' => $request->date,
            'category_id' => $category->id,
        ]);

        return response()->json(['message' => 'Expense upated successfully', 'expense'=> $expense]);
    }

    public function destroy(Expense $expense){
        $this->authorize('delete', $expense);

        $expense->delete();

        return response()->json(['message' => 'Expense delted successfully']);
    }
}
