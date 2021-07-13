<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\Users;
use Inertia\Inertia;

class UsersController extends Controller
{
    public function login(Request $request)
    {
        return Inertia::render('Login', [
            'page' => [
                'title' => 'Login',
                'csrf_token' => csrf_token()
            ]
        ]);
    }

    public function logout()
    {
        Auth::guard('web')->logout();
        return Redirect::to('/login');
    }

    public function usuarios(Request $request)
    {
        $usuarios = Users::all();
        return Inertia::render('Usuarios/List', [
            'page' => [
                'title' => 'Lista de Usuários',
                'csrf_token' => csrf_token(),
                'usuarios' => $usuarios
            ]
        ]);
    }

    public function insert(Request $request)
    {
        return Inertia::render('Usuarios/Insert', [
            'page' => [
                'title' => 'Inserir Usuário',
                'csrf_token' => csrf_token()
            ]
        ]);
    }

    public function update(Request $request)
    {
        $usuario = Users::find($request->id);
        return Inertia::render('Usuarios/Update', [
            'page' => [
                'title' => 'Atualizar Usuário',
                'usuario' => $usuario,
                'csrf_token' => csrf_token()
            ]
        ]);
    }

    private function validateFieldsUpdate(Request $request)
    {
        $rules = [
            'name' => 'required',
        ];

        $mensages = [
            'name.required' => 'Nome deve ser preenchido',
        ];

        return $request->validate($rules, $mensages);
    }

    private function validateFieldsUpdatePassword(Request $request)
    {
        $rules = [
            'name' => 'required',
            'password' => 'required|string',
            'confirmPassword' => 'required|string|same:password'
        ];

        $mensages = [
            'name.required' => 'Nome deve ser preenchido',
            'password.required' => 'Senha deve ser preenchida',
            'confirmPassword.required' => 'Confirmação de Senha deve ser preenchida',
            'confirmPassword.same' => 'As senhas digitadas não são iguais'
        ];

        return $request->validate($rules, $mensages);
    }

    private function validateFields(Request $request)
    {
        $rules = [
            'name' => 'required',
            "email" => "required|email|unique:tb_users,email",
            'password' => 'required|string',
            'confirmPassword' => 'required|string|same:password'
        ];

        $mensages = [
            'name.required' => 'Nome deve ser preenchido',
            'email.required' => 'E-mail deve ser preenchido',
            'email.email' => 'E-mail é invalido',
            'email.unique' => 'E-mail já está cadastrado',
            'password.required' => 'Senha deve ser preenchida',
            'confirmPassword.required' => 'Confirmação de Senha deve ser preenchida',
            'confirmPassword.same' => 'As senhas digitadas não são iguais'
        ];

        return $request->validate($rules, $mensages);
    }

    private function validateFieldsLogin(Request $request)
    {
        $rules = [
            'email'    => 'required|email|exists:tb_users',
            'password' => 'required|string',
        ];

        $messages = [
            'email.required' => 'E-mail deve ser preenchido',
            'email.email' => 'E-mail é invalido',
            'email.exists' => 'E-mail não encontrado',
            'password.required' => 'Senha deve ser preenchida'
        ];

        $request->validate($rules,$messages);
    }

    public function ajax(Request $request)
    {
        $arrayReturn = array('msg' => 'Ação não permitida!', 'status' => false);

        if($request->input('typeAction') == 'insert')
        {
            $this->validateFields($request);

            $checkInsert = Users::insert([
                "name" => $request->input('name'),
                "email" => $request->input('email'),
                "password" =>  Hash::make($request->input('password'))
            ]);

            if($checkInsert)
            {
                $arrayReturn = array('msg' => 'Cadastrado realizado com sucesso!', 'status' => true, 'redirect' => url('/usuarios'));
            }
            else
            {
                $arrayReturn = array('msg' => 'Ops, ocorreu um erro ao realizar o cadastrar!', 'status' => false);
            }

        }

        if($request->input('typeAction') == 'update')
        {

            $fieldsUpdate = [
                "name" => $request->input('name')
            ];

            if($request->input('password') != ''){
                //echo 'aqui';
                $this->validateFieldsUpdatePassword($request);
                $fieldsUpdate = [
                    "name" => $request->input('name'),
                    "password" =>  Hash::make($request->input('password'))
                ];
            }else{
                $this->validateFieldsUpdate($request);
            }

            $checkUpdate = Users::find($request->input('id'))->update($fieldsUpdate);

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
            $checkDelete = Users::find($request->input('id'))->delete();

            if($checkDelete)
            {
                $arrayReturn = array('msg' => 'Cadastro removido com sucesso!', 'status' => true, 'reload' => true);
            }
            else
            {
                $arrayReturn = array('msg' => 'Ops, ocorreu um erro ao remover o cadastro!', 'status' => false);
            }
        }

        if($request->input('typeAction') == 'login')
        {
            $this->validateFieldsLogin($request);

            $checkAuth = Auth::guard('web')->attempt([
                'email' => $request->input('email'),
                'password' => $request->input('password')
            ]);

            if($checkAuth)
            {
                if($request->input('redirect') != '')
                {
                    $arrayReturn = array('redirect' => $request->input('redirect'), 'status' => true);
                }
                else
                {
                    $arrayReturn = array('redirect' => url('/home'), 'status' => true);
                }
            }
            else
            {
                $arrayReturn = array('msg' => 'Ops, ocorreu um erro ao efetuar o login!', 'status' => false);
            }

        }

        return Response()->json($arrayReturn);

    }
}
