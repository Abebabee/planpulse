import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="h-[calc(100vh-5rem)] flex justify-center flex-col items-center bg-light_bg text-light_primary_text dark:bg-dark_bg dark:text-dark_primary_text">
      <div>
        <h1 className="m-4 text-6xl font-extrabold text-light_action_button">
          404,
          <span className="text-4xl"> page not found</span>
        </h1>
      </div>
      <div>
        <p>We looked everywhere for this page.</p>
        <p>Are you sure the website URL is correct?</p>
      </div>
      <div>
        <Link to="/" className="underline text-light_action_button hover:text-action_button_hover">
          Go back home
        </Link>
      </div>
    </div>
  )
}
