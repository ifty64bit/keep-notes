type Props = React.SVGProps<SVGSVGElement>;

function Add(props: Props) {
    return (
        <svg
            width="70px"
            height="70px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                <path
                    d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
                    stroke="#000000"
                    strokeWidth="0.8399999999999999"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
                <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="#000000"
                    strokeWidth="0.8399999999999999"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></circle>
            </g>
        </svg>
    );
}

export default Add;
