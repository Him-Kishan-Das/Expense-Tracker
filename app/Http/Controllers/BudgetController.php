<?php

namespace App\Http\Controllers;

use App\Models\Budget;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BudgetController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'month' => 'required|integer|min:1|max:12',
            'year' => 'required|integer|min:2020|max:2100',
            'amount' => 'required|numeric|min:0',
        ]);

        $userId = Auth::id();

        Budget::updateOrCreate(
            [
                'user_id' => $userId,
                'month' => $request->month,
                'year' => $request->year,
            ],
            ['amount' => $request->amount]
        );

        // Corrected the typo from "width" to "with"
        return redirect()->route('expenses.index')->with('success', 'Budget set successfully.');
    }
}