import { IoAdd, IoTrashOutline } from 'react-icons/io5'
import { useState } from 'react'
import { inviteCollaborators } from '../../../api/apiService'

interface AddCollaboratorProps {
  projectId?: string
}

const AddCollaborator: React.FC<AddCollaboratorProps> = ({ projectId }) => {
  // State to track the entered email and list of emails to be invited
  const [email, setEmail] = useState<string>('')
  const [invitedUsers, setInvitedUsers] = useState<string[]>([])

  // Function to handle adding email to the list
  const handleAddEmail = () => {
    if (email.trim() !== '') {
      setInvitedUsers([...invitedUsers, email])
      setEmail('') // Clear the input field after adding email
    }
  }

  // Function to handle removing email from the list
  const handleRemoveEmail = (index: number) => {
    const updatedUsers = [...invitedUsers]
    updatedUsers.splice(index, 1)
    setInvitedUsers(updatedUsers)
  }

  const handleSendInvites = async () => {
    try{
      if(projectId){
        console.log("hej i handleSendInvites, projectId: "+projectId+" invitedUsers:"+invitedUsers)
        await inviteCollaborators(projectId, invitedUsers)
      }
      console.log("Successfully added users to project!")
    }catch(error){
      console.log("error adding users to project! error: "+error)
    }
    console.log('Inviting users:', invitedUsers)
    
    setInvitedUsers([])
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault() // Prevent form submission to avoid page refresh
        handleAddEmail() // Add the email when the form is submitted
      }}
      className=""
      style={{ width: '100%' }}
    >
      <label htmlFor="collaborators">Add collaborators:</label>
      <div className="flex flex-row text-center">
        <input
          type="email"
          placeholder="abc@example.com..."
          className="shadow-sm text-sm rounded-lg block w-full p-2.5 border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="button"
          className="rounded-lg px-3 bg-primary text-primary_foreground dark:text-dark_accent hover:bg-primary/90"
          onClick={handleAddEmail}
        >
          <IoAdd size={20} className=" rounded-lg" />
        </button>
      </div>

      <table className="text-left" style={{ width: '100%' }}>
        <thead>
          <tr>
            <th className="font-normal">Users to add:</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {invitedUsers.map((user, index) => (
            <tr key={index} className='flex flex-row justify-between'>
              <td>{user}</td>
              <td>
                <button className="text-foreground dark:text-dark_foreground hover:text-foreground/60 dark:hover:text-dark_foreground/60" onClick={() => handleRemoveEmail(index)}>
                  <IoTrashOutline size={20} className="text-right" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-2" style={{ width: '100%' }}>
        <button
          type="button"
          className="bg-primary text-primary_foreground dark:text-dark_accent hover:bg-primary/90 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          style={{ width: '100%' }}
          onClick={handleSendInvites}
        >
          Send invites
        </button>
      </div>
    </form>
  )
}
export default AddCollaborator
