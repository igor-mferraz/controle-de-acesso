import axios from "axios"
import { useEffect, useState } from "react"

export default function HomeAdmin() {

    const [visitantes, setVisitantes] = useState([])

    useEffect(()=>{
        axios.get("https://apex.oracle.com/pls/apex/captura_de_leads/usuarios/usuario")
        .then(({data})=>{
            setVisitantes(data.items);
        })
        .catch(()=>{
            alert('Houve um erro')
        })
    },[])

    return (
      <div className="flex flex-col justify-start items-center w-full min-h-screen pt-4 bg-gray-600">
        <div className="flex flex-col justify-center items-center gap-2 p-2 w-full max-w-4xl">
          <p className="text-white text-lg">Lista de Visitantes!</p>
          <div className="flex justify-center items-center flex-col gap-2 w-full">
            {
                visitantes.map((item:any,index:number)=>{
                    return(
                        <div className="flex justify-center items-center bg-white rounded-md p-1 w-full" key={index}>
                            <div className="flex justify-center items-center flex-col sm:flex-row w-full">
                                <p className="w-full sm:w-40 border p-1">Nome: {item.nome}</p>
                                <p className="w-full sm:w-40 border p-1">CPF: {item.cpf}</p>
                                <p className="w-full sm:w-60 border p-1">Entrada: {new Date(item.data_entrada.split('Z')[0]).toLocaleString()}</p>
                                <p className="w-full sm:w-60 border p-1">Saida: {new Date(item.data_saida.split('Z')[0]).toLocaleString()}</p>
                            </div>
                        </div>
                    )
                })
            }
          </div>
        </div>
      </div>
    )
  }