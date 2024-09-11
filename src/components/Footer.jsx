
import { useState, useEffect } from "react";
import { IoIosStar } from "react-icons/io";

const Footer = () => {

    const [popUp, setPopUp] = useState(false);
    const [closePopUp, setClosePopUp] = useState(false);
    const [starred, setStarred] = useState(false);
    const [getDate, setGetDate] = useState(new Date().getFullYear());

    useEffect(() => {
        setTimeout(() => {
            setPopUp(true);
        }, 5000);
    }, []);

    useEffect(() => {
        if (closePopUp) {
            setPopUp(false);
        }
    }, [closePopUp]);




    return (
        <footer className="border-t border-black fixed bottom-0 w-full items-center flex justify-between px-2">
            <div className="flex items-center space-x-2">
                <p className="text-sm text-black">© {getDate} joonajs</p>
            </div>

            {popUp && (
                <div className="fixed top-5 xl:top-5 xl:right-6 space-y-2 z-50 gap-5  hover:bg-black transition-all">
                    <div className="bg-white border-black border text-black py-2 px-4 flex items-center col-span-3 z-50 mb-1">
                        <p className="text-center text-sm">We don't use cookies or want your consent to anything, I'm only asking you to star this project on GitHub if you are enjoying it!</p>
                        <button
                            onClick={() => setClosePopUp(true)}
                            className="ml-2 px-4 py-2 bg-white text-black border-black active:px-6 border hover:bg-neutral-100 focus:outline-none focus:ring-0 focus:ring-green-400 transition-all duration-300 ease-in-out font-medium text-sm"
                        >
                            Not right now!
                        </button>
                        <button
                            onClick={() => window.open('https://github.com/joonajs/sorter')}
                            className="ml-2 flex items-center px-4 py-2 bg-white text-black border-black active:px-6 border active:border hover:bg-neutral-100 focus:outline-none focus:ring-0 focus:ring-green-400 transition-all duration-300 ease-in-out font-medium text-sm"
                        >
                           <IoIosStar className="mr-2" /> Star on GitHub
                           
                        </button>
                

                    </div>
                </div>
            )}


        </footer>
    );
    };

    export default Footer;