import "./Featured.css"
import CountUp from "../Counter/CountUp";

const Featured =()=>{
    return(
        <>
        <div className="h-[400px] bg-white flex items-center justify-center flex-row">
            <h1 className="text-6xl"><span>Employee</span> <br /><span>Working</span></h1>
            <br />
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            &nbsp;
            <CountUp
            from={0}
            to={100}
            separator=","
            direction="up"
            duration={1}
            className="count-up-text text-6xl"
            />
        </div>
        
        </>
    )
}

export default Featured;