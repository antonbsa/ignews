import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {
  return (
    <>
      <Head>
        <title>Post | Ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href='#'>
            <time>12 de hoje de 2022</time>
            <strong>Redux: O passo a passo</strong>
            <p>O Redux é uma biblioteca para gerenciamento de estado que segue os princípios da arquitetura flux. Não vou entrar em detalhes profundos, mas o que você precisa entender aqui são alguns princípios básicos dessa biblioteca:</p>
          </a>
          <a href='#'>
            <time>12 de hoje de 2022</time>
            <strong>Redux: O passo a passo</strong>
            <p>O Redux é uma biblioteca para gerenciamento de estado que segue os princípios da arquitetura flux. Não vou entrar em detalhes profundos, mas o que você precisa entender aqui são alguns princípios básicos dessa biblioteca:</p>
          </a>
          <a href='#'>
            <time>12 de hoje de 2022</time>
            <strong>Redux: O passo a passo</strong>
            <p>O Redux é uma biblioteca para gerenciamento de estado que segue os princípios da arquitetura flux. Não vou entrar em detalhes profundos, mas o que você precisa entender aqui são alguns princípios básicos dessa biblioteca:</p>
          </a>
        </div>
      </main>
    </>
  )
}