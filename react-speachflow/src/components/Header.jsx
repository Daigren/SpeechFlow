import ModalWindow from './ModalWindow'

export default function Header() {

  return (
    <header>
        <div id='headerImg'>
            <ModalWindow />
            <h1>Speachflow</h1>
        </div>
        <div id='headerDiv'>
          <img src='./public/img/left.svg'></img>
          <span id='nameNote'>Note 1</span>
          <img src='./public/img/right.svg'></img>
        </div>
    </header>
  )
}