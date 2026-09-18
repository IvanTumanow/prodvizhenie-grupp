interface Props {
    toggleMenu: () => void;
    isOpen: boolean
}

export default function BurgerButton({toggleMenu, isOpen}: Props) {
    return (
        <>
            <button
                onClick={toggleMenu}
                className="relative cursor-pointer flex flex-col justify-between w-4 h-4 md:hidden focus:outline-none"
                aria-label="Toggle menu"
            >
                <span className={`w-full h-0.5 bg-black transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-1' : ''}`} />
                <span className={`w-full h-0.5 bg-black transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
                <span className={`w-full h-0.5 bg-black transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-1' : ''}`} />
            </button>
        </>
    )
}