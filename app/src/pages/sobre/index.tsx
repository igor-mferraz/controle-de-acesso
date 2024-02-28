import logo from '../../assets/pormade-logo.png'
export default function Sobre() {
    return (
      <div className="flex flex-col justify-start items-center w-full min-h-screen pt-4 bg-gray-600">
        <div className="flex flex-col justify-center items-center gap-2 p-2">
          <img className="border w-36 bg-white rounded-lg" src={logo} alt="logo da pormade" />
          <p className="text-white text-lg">Seja bem-vindo a Pormade!</p>
        </div>
      </div>
    )
  }