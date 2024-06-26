interface TaskTagProps{
    tagName: string
}

const tagColors: {[key: string]: string} = {
    'Bug': 'bg-tag_bug',
    'Feature':'bg-tag_feat',
    'UI':'bg-tag_ui',
    'Test': 'bg-tag_test',
    'Other':'bg-tag_other'
}

const TaskTag: React.FC<TaskTagProps> = ({tagName}) => {
    const color = tagColors[tagName]
    return(
        <div className={`rounded-md p-0.5 pt-1 px-1 text-xs dark:text-foreground ${color}`}>
            <p className="align-middle">{tagName}</p>
        </div>
    )
}

export default TaskTag