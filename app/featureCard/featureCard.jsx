import Image from "next/image"
import SmileDrawerContainer from "../molecules/SmilesDrawerContainer"; // ({ SMILES, theme='dark', height, width, className })

const FeaturedCard = ({ molName, CAS, molSMILES, description }) => {

	return (

		<div className='h-[100%] w-[100%] transition-all cursor-pointer hover:origin-center hover:scale-[1.025] bg-gradient-to-t from-indigo-200 via-blue-200 to-sky-200 rounded-2xl'>
				<SmileDrawerContainer
					SMILES={molSMILES}
					height={"100%"}
					width={"100%"}
					theme="github"
					className={`w-full h-64 py-4 px-8`}
				/>
			<div className='information pt-0 p-7'>
				<h3 className='name whitespace-nowrap text-slate-900 font-mono pt-5 text-md font-bold border-t-2 border-t-blue-100'>{molName}</h3>
				<h4 className='font-mono text-sm mb-5'><b>CAS# </b>{CAS}</h4>
				<p className='whitespace-normal text-sm text-ellipsis overflow-hidden line-clamp-6 mh-[300px]'>{description}</p>
				<div>
					<p className='font-mono text-md mt-5 text-right tracking-tight'>Learn More <span aria-hidden="true">&rarr;</span></p>
				</div>
			</div>
		</div>

	)

}

export default FeaturedCard