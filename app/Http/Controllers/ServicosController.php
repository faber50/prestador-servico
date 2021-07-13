<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Users;
use Inertia\Inertia;
use App\Models\Servicos;

class ServicosController extends Controller
{
    public function servicos(Request $request)
    {
        $servicos = Servicos::all();
        return Inertia::render('Servicos/List', [
            'page' => [
                'title' => 'Lista de Serviços',
                'servicos' => $servicos,
                'csrf_token' => csrf_token()
            ]
        ]);
    }

    public function insert(Request $request)
    {
        return Inertia::render('Servicos/Insert', [
            'page' => [
                'title' => 'Inserir Serviço',
                'csrf_token' => csrf_token()
            ]
        ]);
    }

    public function update(Request $request)
    {
        $servico = Servicos::find($request->id);
        return Inertia::render('Servicos/Update', [
            'page' => [
                'title' => 'Atualizar Serviço',
                'servico' => $servico,
                'csrf_token' => csrf_token()
            ]
        ]);
    }

    private function validateFields(Request $request)
    {
        $rules = [
            'nome'    => 'required|string'
        ];

        $messages = [
            'nome.required' => 'Nome deve ser preenchido'
        ];

        $request->validate($rules,$messages);
    }

    public function ajax(Request $request)
    {
        $arrayReturn = array('msg' => 'Ação não permitida!', 'status' => false);

        if($request->input('typeAction') == 'insert')
        {
            $this->validateFields($request);

            $checkInsert = Servicos::insert([
                "nome" => $request->input('nome')
            ]);

            if($checkInsert)
            {
                $arrayReturn = array('msg' => 'Cadastrado realizado com sucesso!', 'status' => true, 'redirect' => url('/servicos'));
            }
            else
            {
                $arrayReturn = array('msg' => 'Ops, ocorreu um erro ao realizar o cadastrar!', 'status' => false);
            }

        }

        if($request->input('typeAction') == 'update')
        {

            $this->validateFields($request);

            $checkUpdate = Servicos::find($request->input('id'))->update([
                "nome" => $request->input('nome')
            ]);

            if($checkUpdate)
            {
                $arrayReturn = array('msg' => 'Cadastro atualizado com sucesso!', 'status' => true, 'reload' => true);
            }
            else
            {
                $arrayReturn = array('msg' => 'Ops, ocorreu um erro ao atualizar o cadastro!', 'status' => false);
            }

        }

        if($request->input('typeAction') == 'delete')
        {
            $checkDelete = Servicos::find($request->input('id'))->delete();

            if($checkDelete)
            {
                $arrayReturn = array('msg' => 'Cadastro removido com sucesso!', 'status' => true, 'reload' => true);
            }
            else
            {
                $arrayReturn = array('msg' => 'Ops, ocorreu um erro ao remover o cadastro!', 'status' => false);
            }
        }

        return Response()->json($arrayReturn);

    }
}
