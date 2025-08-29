<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;

class CategoryController extends Controller
{
    use AuthorizesRequests; // Include the AuthorizesRequests trait here

    public function index(){
        $categories = Auth::user()->categories()->latest()->get();
        return Inertia::render('Categories/Index', [
            'categories' => $categories,
            'flash' => session('success')
        ]);
    }

    public function store(Request $request){
        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name',
        ]);

        Auth::user()->categories()->create([
            'name' => $request->name,
        ]);

        return redirect()->route('categories.index')->with('sucess', 'Category created successfully.');
    }

    public function update(Request $request, Category $category){
        $this->authorize('update', $category);

        $request->validate([
            'name' => 'required|string|max:255|unique:categories,name,'. $category->id,
        ]);

        return response()->json(['message' => 'Category updated successfully', 'category' => $category]);
    }

    public function destroy(Category $category)
{
    // Ensure the category belongs to the authenticated user
    if ($category->user_id !== Auth::id()) {
        abort(403, 'Forbidden');
    }

    $category->delete();

    return redirect()->route('categories.index')->with('success', 'Category deleted successfully.');
}
}
