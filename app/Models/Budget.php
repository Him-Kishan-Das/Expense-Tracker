<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Budget extends Model{
    use HasFactory;

    protected $fillable = ['user_id', 'month', 'year', 'amount'];

    public static function currentMonthBudget($userId, $month, $year){
        return self::where('user_id', $userId)->where('month', $month)->where('year', $year)->first();
    }
}