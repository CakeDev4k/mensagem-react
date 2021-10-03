import {useState, useEffect} from 'react'
import './app.css'

function App() {
  const database = []

  let [db,setDB] = useState(database)
  let [mens,setMens] = useState('')
  const [name,setName] = useState('Susie')
  const [editor,setEditor] = useState(false)
  const [perfil,setPerfil] = useState('susie.png')

  let text = document.getElementsByClassName('Text-input')

  useEffect(() => {
    function getData() {
      const GetMensagensDb = localStorage.getItem('Mensagens')

      if (!GetMensagensDb) {
        return localStorage.setItem('Mensagens', '[]')
      }

      const RenderMensagens = JSON.parse(GetMensagensDb)

      setDB(RenderMensagens)
    }

    getData()
  }, [])

  useEffect(() => {
    localStorage.setItem('Mensagens', JSON.stringify(db))
  }, [db])

  function EnviarMens(){
    
    if (mens === ''){
      return alert('digite algo no input por favor')
    }

    if (name === ''){
      return alert('digite o seu nome')
    }

    const id = Math.floor(Math.random() * 10000)

    setDB([...db,{
      id: id,
      name: name,
      mensagem: mens,
      perfil: perfil
    }])

    text[0].value = "";
    setMens(mens = "")
  }

  function GetImg(){
    const file = document.getElementsByClassName('file')

    file[0].click()

    file[0].addEventListener('change', () => {
      
      if (file[0].files.length <= 0){
        return
      }

      let render = new FileReader()

      render.onload = () => {
        setPerfil(render.result)
      }

      render.readAsDataURL(file[0].files[0])
    })
  }

  function enter(even){
    if (even.keyCode===13)
    {
      EnviarMens()
    }
  }

  function enter_editor(even){
    if (even.keyCode===13)
    {
      setEditor(!editor)
    }
  }

  return (
    <div className="App">
      <div className='Editor-perfil'>
        <input type='button' value='Editar' onClick={() => setEditor(!editor)}/>
        { editor ?
        <div className='Editor' id='oi' data-anime='left'>
          <div className='img-editor'>
          <img src={perfil} alt={name} onClick={GetImg}/>
          <input type='file' accept="image/*" class='file'/>
          </div>
          <div class='center-name'> 
            <h2 className='editor-name'>{name}</h2>
          </div>
          <input class='Text-SetName' type='text' value={name} onKeyUp={(even) => enter_editor(even)} onChange={(event) => {setName(event.target.value)}}/>
          <input type='button' value='reset' onClick={() => {setDB(db = [])}}/>
          </div> : <> </>}
        </div> 
      <ul className='mens'>
        {
          db.map((db) => (
          <li key={db.id}>
          <div className='perfil' data-anime='left'>
          <img className='PerfilImg' src={db.perfil} alt={db.name}/>
          <h1>{db.name}</h1>
          </div>
          <p class='text-mensagem' data-anime='left'>{db.mensagem}</p>
          </li> 
        ))} 
      </ul>
      <div className='Enviar'>
      <input className='Text-input' type='text' itemID='teste'
      onChange={(event) => {setMens(event.target.value)}} onKeyUp={(even) => {enter(even)}} />
      <input type='button' value='Enviar' className='Enviar-mens' onClick={EnviarMens}></input>
      </div>
      <div></div>
    </div>
  );
}

export default App;
