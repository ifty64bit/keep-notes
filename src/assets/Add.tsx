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
            <g strokeWidth="0"></g>
            <g strokeLinecap="round" strokeLinejoin="round"></g>
            <g>
                <path
                    d="M7 12L12 12M12 12L17 12M12 12V7M12 12L12 17"
                    stroke="#000000"
                    className="stroke-current"
                    strokeWidth="0.8399999999999999"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></path>
                <circle
                    cx="12"
                    cy="12"
                    r="9"
                    className="stroke-current"
                    strokeWidth="0.8399999999999999"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                ></circle>
            </g>
        </svg>
    );
}

export default Add;
