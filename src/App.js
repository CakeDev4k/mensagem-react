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
      const GetPerfilDb = localStorage.getItem('Perfil')
      const GetNameDb = localStorage.getItem('Name')

      if (!GetMensagensDb) {
        return localStorage.setItem('Mensagens', '[]')
      }
      if (!GetPerfilDb) {
        return localStorage.setItem('Perfil', '')
      }
      if (!GetNameDb) {
        return localStorage.setItem('Name', '')
      }
      

      const RenderMensagens = JSON.parse(GetMensagensDb)
      const RenderPerfil = JSON.parse(GetPerfilDb)
      const RenderName = JSON.parse(GetNameDb)

      setDB(RenderMensagens)
      setPerfil(RenderPerfil)
      setName(RenderName)
    }

    getData()
  }, [])

  useEffect(() => {
    localStorage.setItem('Mensagens', JSON.stringify(db))
  }, [db])

  useEffect(() => {
    localStorage.setItem('Perfil', JSON.stringify(perfil))
  }, [perfil])

  useEffect(() => {
    localStorage.setItem('Name', JSON.stringify(name))
  }, [name])

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
        <input type='button' value='Editar' className='Editar' onClick={() => setEditor(!editor)}/>
        { editor ?
        <div className='Editor' id='oi' data-anime='left'>
          <div className='img-editor'>
          <img src={perfil} alt={name} onClick={GetImg}/>
          <input type='file' accept="image/*" className='file'/>
          </div>
          <div className='center-name'> 
            <h2 className='editor-name'>{name}</h2>
          <input className='Text-SetName' type='text' value={name} onKeyUp={(even) => enter_editor(even)} onChange={(event) => {setName(event.target.value)}}/>
          </div>
          <div className='buttons-editor'>
          <input type='button' value='Reset' onClick={() => {
            setDB(db = []);
            setEditor(!editor)
            }}/>
          <input type='button' value='Sair' onClick={() => {setEditor(!editor)}}/>
          </div>
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
          <p className='text-mensagem' data-anime='left'>{db.mensagem}</p>
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
