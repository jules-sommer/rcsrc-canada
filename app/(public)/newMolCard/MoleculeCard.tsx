import { SmilesDrawerContainer } from "../../_primitives/smilesDrawer/SmilesDrawerWrapper";
import { MoleculeBadge } from "./MoleculeBadge";
import { Molecule, Orientation } from "./molecule.types";

export const MoleculeCard = ({
    
    key,
    skeleton,
    orientation,
    description,
    molecule

} : {
    key: Number,
    skeleton: Boolean,
    orientation: Orientation,
    description: Boolean,
    molecule: Molecule
}) => {

    console.log(`Skeleton: ${skeleton}`);
    console.log(`Orientation: ${orientation}`);

    const isVertical = orientation === 'vertical' ? true : false;
    const hasDescription = description === true ? true : false;

    return (

        <div {...key} className={`card !h-min flex grid-flow-row-dense shrink bg-white w-full ${isVertical ? 'grid grid-cols-1 grid-rows-3' : 'grid grid-rows-2 grid-cols-2' }`}>

            <div className={`card-image flex flex-grow-0 shrink ${isVertical ? '' : 'h-auto w-full'} p-6 row-span-1 col-span-1`}>
                
                <SmilesDrawerContainer
                    className={'card-smiles-image flex w-full h-full grow'}
                    smiles={molecule.smiles}
                    height={'200px'}
                    width={'200px'}
                />

            </div>

            <div className={`card-title flex col-span-1 row-span-1 shrink prose font-mono flex-col items-start ${isVertical ? 'pt-0 p-7' : 'pl-0 p-7'}`}>

                <h3 className={`text-2xl m-0 leading-2 p-0 font-semibold text-gray-900`}>{molecule.name}</h3>
                <p className={`text-md m-0 mb-4 p-0 font-light text-gray-900`}>CAS# {molecule.CAS}</p>

                <div className="flex flex-row flex-wrap">

                    {molecule.tags.map((tag, index) => (
                        <MoleculeBadge key={index} size={'small'}>{tag}</MoleculeBadge>    
                    ))}

                </div>

            </div>

            <div className={`card-description flex shrink prose h-min font-mono p-7 ${isVertical ? 'col-span-1' : 'col-span-2'}`}>

                <p className="line-clamp-6">{molecule.description}</p>

            </div>

        </div>

    )

}