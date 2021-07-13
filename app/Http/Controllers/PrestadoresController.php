<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Servicos;
use App\Models\Prestadores;
use Inertia\Inertia;
use App\Http\Resources\PrestadorResource;

class PrestadoresController extends Controller
{
    public function prestadores(Request $request)
    {
        $prestadores = PrestadorResource::collection(Prestadores::all());
        return Inertia::render('Prestadores/List', [
            'page' => [
                'title' => 'Lista de Prestadores',
                'prestadores' => $prestadores,
                'csrf_token' => csrf_token()
            ]
        ]);
    }

    public function insert(Request $request)
    {
        $servicos = Servicos::all();
        return Inertia::render('Prestadores/Insert', [
            'page' => [
                'title' => 'Inserir Prestador',
                'servicos' => $servicos,
                'csrf_token' => csrf_token()
            ]
        ]);
    }

    public function update(Request $request)
    {
        $servicos = Servicos::all();
        $prestador = new PrestadorResource(Prestadores::find($request->id));
        return Inertia::render('Prestadores/Update', [
            'page' => [
                'title' => 'Atualizar Prestador',
                'servicos' => $servicos,
                'prestador' => $prestador,
                'csrf_token' => csrf_token()
            ]
        ]);
    }

    private function validateFields(Request $request)
    {
        $rules = [
            'nome'    => 'required|string',
            'email'    => 'required|email',
            'telefone'    => 'required|string',
            'idade' => 'required',
            'idServico' => 'required'
        ];

        $messages = [
            'nome.required' => 'Nome deve ser preenchido',
            'email.required' => 'E-mail deve ser preenchido',
            'email.email' => 'E-mail é invalido',
            'telefone.required' => 'Telefone deve ser preenchido',
            'idade.required' => 'Idade deve ser preenchida',
            'idServico.required' => 'Serviço deve ser selecionado'
        ];

        $request->validate($rules,$messages);
    }

    public function ajax(Request $request)
    {
        $arrayReturn = array('msg' => 'Ação não permitida!', 'status' => false);

        if($request->input('typeAction') == 'insert')
        {
            $this->validateFields($request);

            $checkInsert = Prestadores::insert([
                "nome" => $request->input('nome'),
                "email" => $request->input('email'),
                "telefone" => $request->input('telefone'),
                "idade" => $request->input('idade'),
                "id_servico" => $request->input('idServico')
            ]);

            if($checkInsert)
            {
                $arrayReturn = array('msg' => 'Cadastrado realizado com sucesso!', 'status' => true, 'redirect' => url('/prestadores'));
            }
            else
            {
                $arrayReturn = array('msg' => 'Ops, ocorreu um erro ao realizar o cadastrar!', 'status' => false);
            }

        }

        if($request->input('typeAction') == 'update')
        {

            $this->validateFields($request);

            $checkUpdate = Prestadores::find($request->input('id'))->update([
                "nome" => $request->input('nome'),
                "email" => $request->input('email'),
                "telefone" => $request->input('telefone'),
                "idade" => $request->input('idade'),
                "id_servico" => $request->input('idServico')
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
            $checkDelete = Prestadores::find($request->input('id'))->delete();

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
