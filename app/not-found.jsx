import Link from "next/link"
import Image from "next/image"
import Layout from "./layout"

const GoHomeLink = () => {



}

export default function Error() {

    return (
        <div className="h-[100vh] w-[100vw] relative">
        <div className={`flex h-[calc(100vh-72px)] w-full items-center relative justify-center z-10`}>
          <div className="text-center">
            <p className="text-4xl font-bold font-mono text-indigo-600">404</p>
            <h1 className="mt-4 text-3xl font-bold font-mono tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
            <p className="mt-6 w-2/3 mx-auto text-base leading-7 text-gray-600">Oops. Looks like we spilled a beaker of an unknown reagent and our reaction product is a yellow tar-like solid.</p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                className="rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back home
              </a>
              <a href="#" className="text-sm font-semibold text-gray-900">
                Contact support <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </div>
          
        </div>
        <Image 
        className='!h-full !w-full left-0, right-0, top-0, bottom-0 !absolute z-5 blur-sm opacity-50 sepia-[20%]'
        src='/404.jpg'
        alt="Spilled Beaker"
        fill={true}
      />
      </div>
    )
  }

  