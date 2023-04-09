import { Circles } from "react-loader-spinner";
export default function Loader() {
    return (
        <div style={{position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
            <Circles
                height="80"
                width="80"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                    />
        </div>
    );
}