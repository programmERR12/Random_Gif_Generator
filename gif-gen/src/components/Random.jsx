import { useEffect, useState } from 'react'



export default function Random() {

    const [gif, setGif] = useState('');
    const [loading, setLoading] = useState(false);
    const API_KEY = import.meta.env.VITE_GIF_API_KEY;




    const apiurl = `https://api.giphy.com/v1/gifs/random?api_key=${API_KEY}`;


    const fetchData = async () => {
        setLoading(true);
        try {

            const res = await fetch(apiurl);
            const output = await res.json();
            console.log(output);
            setGif(output.data.images.downsized_large.url);




        } catch (err) {

            console.error('Error fetching gif:', err);

        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    function clickHandler() {
        fetchData();

    }

    return (
        <div className="max-w-sm mt-5 mx-auto bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">🎲 Random GIF</h1>





            {loading ? (
                <div className="w-full h-64 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
                </div>
            ) : (
                <img
                    src={gif}
                    alt="Random GIF"
                    className="w-full h-64 object-cover rounded-lg border border-gray-200"
                />
            )}


            <button
                onClick={clickHandler}
                className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:scale-105 transform transition duration-300 shadow-md"
            >
                Generate
            </button>
        </div>

    )
}
