<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use App\Models\Servicos;

class PrestadorResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'nome' => $this->nome,
            'email' => $this->email,
            'telefone' => $this->telefone,
            'idade' => $this->idade,
            'id_servico' => $this->id_servico,
            'idServico' => $this->id_servico,
            'servico' => $this->Servico,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
