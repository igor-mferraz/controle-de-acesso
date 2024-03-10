import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as y from "yup"
import logo from './assets/pormade-logo.png'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

const form = y.object().shape({
  nome: y.string().required(),
  cpf: y.string().required(),
  entrada: y.string().required(),
  saida: y.string().required(),
  descricao: y.string().required()
});

function App() {
  const navigate = useNavigate()
  const { register, handleSubmit, watch, formState: { errors }, setValue } = useForm({
    mode: 'all',
    resolver: yupResolver(form)
  });

  useEffect(()=> {  
    let data = new Date()
    data.setHours(data.getHours()-3)
    setValue("entrada", data.toISOString().slice(0,16))
  },[])

  const tranformaData = (data:string) => {
    let [ano, mes, dia, hora, minuto] = data.split(/[\sT:-]+/);
    let dataUTC = new Date(Date.UTC(parseInt(ano), parseInt(mes) - 1, parseInt(dia), parseInt(hora), parseInt(minuto), 0)).toISOString();
    return dataUTC
  }

  const onSubmit = (data:any) => {
    axios.post("https://apex.oracle.com/pls/apex/captura_de_leads/usuarios/usuario", {
      nome: data.nome,
      cpf: data.cpf,
      entrada: tranformaData(data.entrada),
      saida: tranformaData(data.saida),
      descricao: data.descricao
    })
    .then((res)=>{
      console.log(res);
      navigate('/about')
    })
    .catch((error)=>{
      console.log(error);
    })
    
  };

  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen pt-4 bg-gray-600">
      <div className="flex flex-col justify-center items-center gap-2 p-2">
        <img className="border w-36 bg-white rounded-lg" src={logo} alt="logo da pormade" />
        <p className="text-white text-lg">Preencha o formulario para visitar o escritorio</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col border w-full max-w-xl rounded-md p-2 gap-2 bg-white shadow-2xl">
        <div className={ `flex flex-col p-2 border rounded-md ${errors.cpf ? 'border-red-600': ""}`}>
          <label className={`font-bold`} htmlFor="cpf">CPF</label>
          <input {...register('cpf')} id="cpf" className="outline-none" type="text" placeholder="Digite seu CPF" />
        </div>
        <div className={ `flex flex-col p-2 border rounded-md ${errors.nome ? 'border-red-600': ""}`}>
          <label className="font-bold" htmlFor="nome">Nome</label>
          <input {...register('nome')} id="nome" className="outline-none" type="text" placeholder="Digite seu nome" />
        </div>
        <div className={ `flex flex-col p-2 border rounded-md ${errors.entrada ? 'border-red-600': ""}`}>
          <label className="font-bold" htmlFor="entrada">Horario Entrada</label>
          <input {...register('entrada')} id="entrada" className="outline-none" type="datetime-local" />
        </div>
        <div className={ `flex flex-col p-2 border rounded-md ${errors.saida ? 'border-red-600': ""}`}>
          <label className="font-bold" htmlFor="saida">Horario Saida</label>
          <input {...register('saida')} id="saida" className="outline-none" type="datetime-local" />
        </div>
        <div className={ `flex flex-col p-2 border rounded-md ${errors.descricao ? 'border-red-600': ""}`}>
          <label className="font-bold" htmlFor="nome">Descrição</label>
          <input {...register('descricao')} id="nome" className="outline-none" type="text" placeholder="Digite uma descrição sobre a visita" />
        </div>
        <button className="p-2 bg-green-600 rounded-md text-white">Enviar</button>
        <Link className="w-full text-center underline text-sm" to={'/admin/home'}>Painel administrativo</Link>
      </form>
    </div>
  )
}

export default App
