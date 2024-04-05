import { Line, Circle } from 'rc-progress';

interface CircularCompletionProps{
    finishedTasks?: number
    unfinishedTasks?: number
}
const CircularCompletion = ({finishedTasks,unfinishedTasks}: CircularCompletionProps)=>{

    const totalTasks = (finishedTasks || 0) + (unfinishedTasks || 0);
    const completionPercentage = Math.round(totalTasks > 0 ? (finishedTasks || 0) / totalTasks * 100 : 0);
    
    const setStrokeColor = ()=>{
        let strokeColor = ""
        if(completionPercentage<=33)
            strokeColor='#e64747'
        if(completionPercentage>33 && completionPercentage<=66)
            strokeColor="#e6e22e"
        if(completionPercentage>66)
            strokeColor='#16a34a'
        return strokeColor
    }

    return(
        <div className="mt-5 rounded-lg p-3 flex flex-col-reverse lg:flex-row items-center w-4/4 justify-center lg:w-1/3 lg:justify-start"
        >
            <Circle percent={completionPercentage} strokeWidth={6} strokeColor={setStrokeColor()} trailWidth={2} style={{ width: '30%'}}/>
            <div className='text-center pl-5'>
                <p className='font-semibold'>Getting there! {completionPercentage}% Done!</p>
            </div>
        </div>
    )
}
export default CircularCompletion