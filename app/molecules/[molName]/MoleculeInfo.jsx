import Image from 'next/image';
import SmileDrawerContainer from '../SmilesDrawerContainer';

const getProductByName = async (prodName) => {

    console.log(prodName);

    const res = await fetch(`http://localhost:3000/api/products/molName?val=${prodName}`);
    const product = await res.json();

    return JSON.parse(product);

};

export const MoleculeInfo = async ({ product }) => {
    
//    const { success, product } = await getProductByName(molName);

    console.log(product);

    if ( product && product.length !== 0) {

        return (

            <div className="flex w-[100%] px-12 mx-auto">

                <div className="w-64 h-64 flex-shrink-0 rounded-2xl inline-flex mr-24 items-center bg-indigo-100 ring-1 ring-inset ring-indigo-600-700/30">
                    <SmileDrawerContainer
                        SMILES={product.molSMILES}
                        height={"100%"}
                        width={"100%"}
                        theme="github"
                        className={`w-full h-full p-4 pl-6 ${product.inStock[0] ? `opacity-75` : null}`} />
                </div>

                <div className="text-sky-100 flex flex-col font-mono title w-9/12 mx-auto mb-8">

                    <h1 className="text-4xl">{product.molName}</h1>

                    <span className="my-5">

                        <h2 className="text-md text-sky-100/50">
                            <b className="text-sky-100/75">CAS#</b>
                            {' '}
                            {product.molCAS}
                        </h2>
                        <h2 className="text-md text-sky-100/50">
                            <b className="text-sky-100/75">IUPAC:</b>
                            {' '}
                            {product.iupac}
                        </h2>
                        <h2 className="text-md text-sky-100/50">
                            <b className="text-sky-100/75">SMILES:</b>
                            {' '}
                            {product.molSMILES}
                        </h2>

                    </span>

                    <div className="flex flex-row my-5">

                        {product.tags ? product.tags.map((thisTag) => (
                            <span className="inline-flex mr-2 items-center rounded-md bg-purple-50 px-2 py-1 text-xs font-medium text-purple-700 ring-1 ring-inset ring-blue-700/30">{thisTag}</span>
                        )) : null}

                    </div>

                    <div>

                        <p className="font-sans leading-loose my-5 text-lg font-light">{product.description}</p>

                    </div>

                </div>

            </div>

        );
        
    }

}

export default MoleculeInfo;