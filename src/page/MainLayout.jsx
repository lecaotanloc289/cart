import ResponsiveAppBar from "./ResponsiveAppBar";

export function MainLayout (props) {
    return (
        <>
            <ResponsiveAppBar/>
            {props.children}
        </>
    )
}