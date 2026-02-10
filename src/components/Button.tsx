import React from "react";

type Props = {
    type?: "button" | "submit" | "reset";
    icon?: React.ReactNode;
    iconPosition?: "left" | "right";
    variant?: "primary" | "secondary" | "ghost" | "outline";
} & React.HTMLAttributes<HTMLButtonElement>;

function Button({
    icon,
    iconPosition,
    children,
    className = "",
    type = "button",
    variant = "outline",
    ...rest
}: Props) {
    const variantClasses = {
        primary: "btn btn-primary",
        secondary: "btn btn-secondary",
        ghost: "btn btn-ghost",
        outline: "btn btn-outline",
    };

    return (
        <button
            className={`${variantClasses[variant]} ${className}`}
            type={type}
            {...rest}
        >
            {icon && iconPosition === "left" && (
                <span className="shrink-0">{icon}</span>
            )}
            {children}
            {icon && iconPosition === "right" && (
                <span className="shrink-0">{icon}</span>
            )}
        </button>
    );
}

export default Button;
