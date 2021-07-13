<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Prestadores extends Model
{
    use HasFactory;

    protected $fillable = [
        'nome', 'email', 'telefone', 'idade', 'id_servico'
    ];

    protected $table = 'tb_prestadores';

    public function Servico()
    {
        return $this->belongsTo(Servicos::class,'id_servico', 'id');
    }
}
