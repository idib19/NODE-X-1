

const MenuIcon = ({  }) => (
    <button  className="lg:hidden">
        MENU ICON
        {/* Here you would put your SVG or icon library's hamburger icon */}
        <svg viewBox="0 0 100 80" width="40" height="40">
            <rect width="100" height="20"></rect>
            <rect y="30" width="100" height="20"></rect>
            <rect y="60" width="100" height="20"></rect>
        </svg>
    </button>
);

export default MenuIcon;