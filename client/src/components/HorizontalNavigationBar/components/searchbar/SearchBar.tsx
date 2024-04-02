import Button from '../../../Button'

const onClick = () => {
  console.log('Hej')
}
export default function HorizontalNavigationBar() {
  return (
    <form action="" className="flex flex-row">
      <div className="relative">
        <div className="absolute"></div>
      </div>
      <input
        type="search"
        id="default-search"
        className="block w-full  h-10 ps-10 text-sm rounded-md border border-input dark:border-dark_input bg-card dark:bg-dark_card dark:text-dark_foreground focus-visible:outline-none  focus-visible:ring-2 focus-visible:ring-ring mr-1"
        placeholder="Search..."
      />
      <Button onClick={onClick} title="Search" />
    </form>
  )
}
