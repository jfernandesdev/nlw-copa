import { FormEvent, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'

import { ToastContainer, toast } from 'react-toastify';

import logoImage from '../assets/logo-nlw-copa.svg'
import appPreviewImg from '../assets/app-nlw-copa-mockup.png'
import usersAvatarImg from '../assets/users-avatar-example.png'
import iconCheckImg from '../assets/icon-check.svg'

import { api } from '../lib/axios'

import 'react-toastify/dist/ReactToastify.css';

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home({ poolCount, guessCount, userCount }: HomeProps) {
  const [poolTitle, setPoolTitle] = useState('')

  async function createPool(event : FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('/pools', {
        title: poolTitle,
      }) 
      
      const { code } = response.data

      await navigator.clipboard.writeText(code)

      toast.success('Bolão criado com sucesso, o código foi copiado para sua área de transferência! 😉');
      setPoolTitle('')
    } catch (err) {
      console.log(err)
      toast.error('Falha ao criar o bolão, tente novamente! 😢');
    }
  }

  return (
    <>
      <Head>
        <title>Bolão NLW#Copa</title>
      </Head>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" 
      />

      <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
        <main>
          <Image src={logoImage} alt="NLW Copa" />
          <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
            Crie seu próprio bolão da copa e compartilhe entre amigos!
          </h1>

          <div className="mt-10 flex items-center gap-2">
            <Image src={usersAvatarImg} alt="Avatar das pessoas que estão usando o app" />
            <strong className="text-gray-100 text-xl">
              <span className="text-ignite-500">+{userCount}</span> pessoas já estão usando
            </strong>
          </div>

          <form 
            onSubmit={createPool}
            className="mt-10 flex gap-2"
          >
            <input
              type="text"
              className="flex-1 px-6 py-4 rounded text-gray-100 bg-gray-800 border border-gray-600 text-sm"
              placeholder="Qual nome do seu bolão?"
              onChange={(event) => setPoolTitle(event.target.value)}
              value={poolTitle}
              required
            />
            <button
              type="submit"
              className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
            >Criar meu bolão</button>
          </form>

          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Após criar seu bolão, você receberá um código único que poderá usar para convidar outras pessoas 🚀
          </p>

          <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-xl">+{poolCount}</span>
                <span>Bolões criados</span>
              </div>
            </div>

            <div className="w-px h-14 bg-gray-600" />

            <div className="flex items-center gap-6">
              <Image src={iconCheckImg} alt="" />
              <div className="flex flex-col">
                <span className="font-bold text-xl">+{guessCount}</span>
                <span>Palpites enviados</span>
              </div>
            </div>
          </div>

        </main>

        <Image
          src={appPreviewImg}
          alt="Dois celulares exibindo uma prévia da aplicação móvel do NLW Copa"
          quality={100}
        />
      </div>
    </>
  )
}

export const getServerSideProps = async () => {
  const [
    poolCountResponse, 
    guessCountResponse, 
    userCountResponse
  ] = await Promise.all([
    api.get('pools/count'),
    api.get('guesses/count'),
    api.get('users/count'),
  ])
 
  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: userCountResponse.data.count
    }
  }
}
