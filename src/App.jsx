import { useState, useEffect } from 'react'
import NavBar from './Components/NavBar'
import Footer from './Components/Footer'
import { v4 as uuidv4 } from 'uuid';
import { FaCopy, FaRegEye, FaRegEyeSlash, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


// import './App.css'



function App() {
  const [webName, setwebName] = useState("")
  const [webURL, setwebURL] = useState("")
  const [webUsername, setwebUsername] = useState("")
  const [webPassword, setwebPassword] = useState("")

  const [webNames, setwebNames] = useState([])

  const [showMyPassword, setShowMyPassword] = useState(false);

  const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';


  const getPasswords = async () => {
    try {
      // let req = await fetch("http://localhost:3000/");
      let req = await fetch(`${BASE_URL}/`);
      let passwords = await req.json();
      setwebNames(passwords);
    } catch (e) {
      console.log(e);
      console.log("Database is not up and running so using local Storage.");
      let webNamessStrings = localStorage.getItem("webNames");
      if (webNamessStrings) {
        let webNamess = JSON.parse(localStorage.getItem("webNames"))
        setwebNames(webNamess);
      }
    }
  }

  const saveToLS = async (arr, obj, id = '') => {
    try {
      if (id.length === 0) {
        // let res = await fetch("http://localhost:3000/", { method: "POST", headers: { "content-Type": "application/json" }, body: JSON.stringify(obj) });
        let res = await fetch(`${BASE_URL}/`, { method: "POST", headers: { "content-Type": "application/json" }, body: JSON.stringify(obj) });
      } else {
        // let res = await fetch("http://localhost:3000/", { method: "DELETE", headers: { "content-Type": "application/json" }, body: JSON.stringify({id: id}) });
        let res = await fetch(`${BASE_URL}/`, { method: "DELETE", headers: { "content-Type": "application/json" }, body: JSON.stringify({id: id}) });
      }
    } catch (e) {
      console.log(e);
      console.log("Database is not up and running so using local Storage.");
      localStorage.setItem("webNames", JSON.stringify(arr));
    }
  }



  useEffect(() => {
    getPasswords();
  }, [])



  const handleChangewebName = (e) => {
    setwebName(e.target.value)
  }
  const handleChangewebURL = (e) => {
    setwebURL(e.target.value)
  }
  const handleChangewebUsername = (e) => {
    setwebUsername(e.target.value)
  }
  const handleChangewebPassword = (e) => {
    setwebPassword(e.target.value)
  }


  const handleAdd = () => {
    if ((webName.length <= 3) || (webURL.length <= 3) || (webUsername <= 3) || (webPassword <= 3)) {
      alert("Length must be greater than 3.");
    } else {
      let obj = { id: uuidv4(), webName, webURL, webUsername, webPassword, showPassword: false }
      setwebNames([...webNames, obj]);
      saveToLS([...webNames, obj], obj);
      setwebName("")
      setwebURL("")
      setwebUsername("")
      setwebPassword("")
    }
  }

  const handleEdit = (e, id) => {
    let t = webNames.filter(i => i.id === id)
    setwebName(t[0].webName)
    setwebURL(t[0].webURL)
    setwebUsername(t[0].webUsername)
    setwebPassword(t[0].webPassword)

    let newwebNames = webNames.filter(item => {
      return item.id != id;
    })
    setwebNames(newwebNames)
    saveToLS(newwebNames, t[0], id);
    window.scrollTo(0, 90)
  }

  const handleDelete = (e, id) => {
    let k = confirm("Are you sure you want to delete this");
    if (k) {
      let newwebNames = webNames.filter(item => {
        return item.id != id;
      })
      let t = webNames.filter(i => i.id === id)
      setwebNames(newwebNames)
      saveToLS(newwebNames,t[0], id);
    }
  }

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      console.error("Copy failed", err);
    }
  }

  const handleShowPassword = (a, id) => {
    let index = webNames.findIndex(item => {
      return item.id === id;
    })
    let newwebNames = [...webNames];
    newwebNames[index].showPassword = !newwebNames[index].showPassword;
    setwebNames(newwebNames);
  }


  return (
    <>
      <NavBar />

      <main className="md:container bg-gray-700 min-h-[80vh] md:max-w-[60vw] mx-auto p-5 rounded-2xl flex flex-col gap-6 my-[70px]">
        <div className='flex justify-center'>
          <h1 className='font-bold text-xl'>MyPasswordVault - Manage Your Passwords</h1>
        </div>

        <div className='flex flex-col gap-2 relative'>
          <div className="my-3">
            <span className="font-bold text-xl">Add Passwords :</span>
          </div>
          <div className='flex flex-col gap-2 w-full md:flex-row p-2'>
            <div className='flex flex-col gap-2 md:w-1/2'>

              <label htmlFor="websiteName">Enter the website name :</label>
              <input onChange={handleChangewebName} value={webName} type="text" id='websiteName' name='websiteName' placeholder='Name of the website' className="bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />

              <label htmlFor="websiteURL">Enter the URL :</label>
              <input onChange={handleChangewebURL} value={webURL} type="url" id='websiteURL' name='websiteURL' placeholder='https://www.example.com' className="bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />

            </div>
            <div className='flex flex-col gap-2 md:w-1/2'>

              <label htmlFor="Username">Enter the Username :</label>
              <input onChange={handleChangewebUsername} value={webUsername} type="text" id='Username' name='Username' placeholder='Username' className="bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />

              <label htmlFor="Password">Enter the Password :</label>
              <div className='relative'>
                <input onChange={handleChangewebPassword} value={webPassword} type={showMyPassword ? "text" : "password"} id='Password' name='Password' placeholder='Password' className="bg-gray-800 text-gray-100 placeholder-gray-500 border border-gray-700 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full" />

                <button
                  onClick={(e) => { setShowMyPassword(!showMyPassword) }}
                  className="ml-auto text-white hover:text-blue-400 cursor-pointer absolute top-1/4 right-3"
                  title={showMyPassword ? 'Hide Password' : 'Show Password'}
                >
                  {showMyPassword ? <FaRegEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                </button>
              </div>

            </div>
          </div>

          <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-md transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer my-4 mx-2" onClick={handleAdd} title='Save'>Save</button>
        </div>

        <div className='flex flex-col gap-4'>
          <div>
            <h1 className='font-bold text-xl'>All Password's :</h1>
          </div>
          <div className='flex flex-col gap-5 p-2'>
            {webNames.length === 0 && <div className='m-5'>No Password to display.</div>}
            {webNames.map(item => {
              return (
                <div key={item.id} className="flex flex-col md:flex-row bg-gray-600 text-white rounded-xl p-6 gap-4">
                  <div className="flex flex-col gap-3 w-full">
                    <div className='flex items-center gap-4 justify-between pb-3 pt-0 pl-2 pr-2'>
                      <h2 className="font-bold text-xl">{item.webName}</h2>
                      <div className="flex gap-3 items-start self-end md:self-auto">
                        <button onClick={(e) => handleEdit(e, item.id)} className="text-white hover:text-green-400 cursor-pointer" title='Edit'>
                          <FaEdit className='w-6 h-6' />
                        </button>
                        <button onClick={(e) => handleDelete(e, item.id)} className="text-white hover:text-red-400 cursor-pointer" title='Delete'>
                          <MdDelete className='w-6 h-6' />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center bg-gray-700 px-3 py-2 rounded-l-md w-full">
                        <span className="truncate">{item.webURL}</span>
                        <a
                          href={item.webURL.startsWith('http') ? item.webURL : `https://${item.webURL}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="ml-auto text-white hover:text-blue-400 cursor-pointer"
                          title="Open Website"
                        >
                          <FaExternalLinkAlt className="w-5 h-5" />
                        </a>
                      </div>
                      <button
                        onClick={() => handleCopy(item.webURL)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-r-md cursor-pointer"
                        title="Copy URL"
                      >
                        <FaCopy className="w-5 h-6" />
                      </button>
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center bg-gray-700 px-3 py-2 rounded-l-md w-full">
                        <span className="truncate">{item.webUsername}</span>
                      </div>
                      <button
                        onClick={() => handleCopy(item.webUsername)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-r-md cursor-pointer"
                        title="Copy Username"
                      >
                        <FaCopy className="w-5 h-6" />
                      </button>
                    </div>

                    <div className="flex items-center">
                      <div className="flex items-center bg-gray-700 px-3 py-2 rounded-l-md w-full">
                        <span className="truncate">
                          {item.showPassword ? item.webPassword : '•'.repeat(item.webPassword.length)}
                        </span>
                        <button
                          onClick={(e) => { handleShowPassword(e, item.id) }}
                          className="ml-auto text-white hover:text-blue-400 cursor-pointer"
                          title={item.showPassword ? 'Hide Password' : 'Show Password'}
                        >
                          {item.showPassword ? <FaRegEyeSlash className="w-5 h-5" /> : <FaRegEye className="w-5 h-5" />}
                        </button>
                      </div>
                      <button
                        onClick={() => handleCopy(item.webPassword)}
                        className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-r-md cursor-pointer"
                        title="Copy Password"
                      >
                        <FaCopy className="w-5 h-6" />
                      </button>
                    </div>
                  </div>


                </div>

              )
            })}
          </div>
        </div>
      </main>

      <Footer />

    </>
  )
}

export default App
