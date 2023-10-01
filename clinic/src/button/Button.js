import "../button/Button.css"
import { Link } from "react-router-dom";
const TypeButton = ({ to, href, className, children, onClick }) => {
    let Comp = "button";
    const props = {
        onClick,
        className: className ? `typebutton ${className}` : "typebutton",
    };

    if (to) {
        Comp = Link;
        props.to = to;
    } else if (href) {
        Comp = 'a';
        props.href = href;
    }

    return <Comp {...props}>{children}</Comp>;
};
export default TypeButton