import React from "react";

type Props = {
    type?: "button" | "submit" | "reset";
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
} & React.HTMLAttributes<HTMLButtonElement>;

function Button({
    icon,
    iconPosition,
    children,
    className,
    type = "button",
    ...rest
}: Props) {
    return (
        <button
            className={`flex [&>*]:shrink-0 gap-2 px-4 py-2 rounded-xl border-blue-600 border-2 hover:bg-blue-600 hover:text-white transition-colors ${className}`}
            type={type}
            {...rest}
        >
            {icon && iconPosition === "left" && icon}
            {children}
            {icon && iconPosition === "right" && icon}
        </button>
    );
}

export default Button;
