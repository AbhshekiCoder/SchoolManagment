import { Loader, Placeholder } from 'rsuite';


function Loading(){
    return (
          <>
     <div id = "loading" className='hidden'>
        <Placeholder.Paragraph rows={8} />
        <Loader backdrop content="loading..." vertical />
     </div>
        </>
    )
}
export default Loading;