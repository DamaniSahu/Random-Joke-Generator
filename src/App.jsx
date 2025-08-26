import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [joke, setJoke] = useState({setup: "", punchline: ""});
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getJoke = () => {
    setLoading(true)
    fetch("https://official-joke-api.appspot.com/random_joke")
    .then(res => res.json())
    .then(data => {
      setJoke({setup: data.setup, punchline: data.punchline})
      setLoading(false);
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
  }

  const copyJoke = () => {
    const text = `${joke.setup} - ${joke.punchline}`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500)
  }

  useEffect(() => {
    getJoke();
  },[])

  return (
    <>
      <div className='w-[90%] bg-lime-200 p-10 text-center rounded-2xl card max-w-lg mx-auto'>
        <h1 className='text-lg sm:text-3xl font-extrabold text-red-500 mb-6 drop-shadow-sm'>
          😂 Random Joke Generator
        </h1>
        
        <div className="m-5 text-black font-semibold min-h-[100px] flex items-center justify-center">
          {loading ? (
            <div className="animate-spin rounded-full h-10 w-10 border-b-4 border-red-500"></div>
          ) : (
            <div className="fade-in">
              <h5 className="text-sm sm:text-xl font-semibold text-gray-800">{joke.setup}</h5>
              <p className="mt-2 text-sm sm:text-lg text-gray-600">{joke.punchline}</p>
            </div>
          )}
        </div>

        <div className='flex justify-around flex-col sm:flex-row gap-3'>
          <button className="bg-red-500 hover:bg-red-600 cursor-pointer active:bg-red-700 text-white font-bold px-5 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
          onClick={getJoke}>
          Generate New Joke
          </button>

          <button onClick={copyJoke} disabled={loading}
          className="bg-white cursor-pointer text-red-500 font-bold px-5 py-3 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
            {copied ? "✅ Copied!" : "📋 Copy Joke"}
          </button>
        </div>
      </div>
    </>
  )
}

export default App
