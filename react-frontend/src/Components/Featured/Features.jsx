import "./Features.css";

const Features = () => {
    return(
        <div className="container w-full flex justify-center flex-row text-2xl gap-8 ">
            <div id="feature1" className="feature ml-10"> <h1 className="text-4xl">Employee Productivity Dashboard</h1>
            <p className="pt-[90px]">Employees can view their productive hours, estimated time for tasks, break history, and overall efficiency for the past 30 days. This helps them track their work habits and improve time management.</p></div>
            <div id="feature2" className="feature ml-2"> <h1 className="text-4xl">Manager Insights & Analytics</h1>
            <p className="pt-[130px]">Managers get reports on employee efficiency, affordability, and work patterns to identify top performers and detect inconsistencies.</p></div>
            <div id="feature3" className="feature ml-2"> <h1 className="text-4xl">Automated Productivity Evaluation</h1>
            <p className="pt-[90px]"> The system analyzes productivity trends, work compliance, and efficiency, ensuring fair assessments and optimized performance.</p></div>
        </div>
    )
}

export default Features;