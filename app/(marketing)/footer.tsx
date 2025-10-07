
import Image from "next/image";

export const Footer = () => {
	
	const color = "white";

	return (
		<footer className="hidden lg:block h-20 w-full border-t border-white/20 p-2">
			<div className="max-w-screen-xl mx-auto flex items-center justify-evenly h-full">

				<Image 
					src={`/pieces/classic/rook-${color}.svg`} 
					alt="German" 
					height={32} 
					width={40}
					className="mr-8 rounded-md"
				/>

				<Image 
					src={`/pieces/classic/knight-${color}.svg`}  
					alt="Spanish" 
					height={32} 
					width={40}
					className="mr-4 rounded-md"
				/>

				<Image 
					src={`/pieces/classic/bishop-${color}.svg`} 
					alt="Frencj" 
					height={32} 
					width={40}
					className="mr-4 rounded-md"
				/>

				<Image 
					src={`/pieces/classic/queen-${color}.svg`}  
					alt="Italian" 
					height={32} 
					width={40}
					className="mr-4 rounded-md"
				/>

				<Image 
					src={`/pieces/classic/king-${color}.svg`}  
					alt="Japanese" 
					height={32} 
					width={40}
					className="mr-4 rounded-md"
				/>
			
				<Image 
					src={`/pieces/classic/pawn-${color}.svg`} 
					alt="Hindi" 
					height={32} 
					width={40}
					className="mr-4 rounded-md"
				/>
				
			</div>
		</footer>
	);
};