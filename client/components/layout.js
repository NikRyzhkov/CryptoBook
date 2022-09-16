import 'semantic-ui-css/semantic.min.css'
import {Container} from 'semantic-ui-react'
import Header from './Header'

const layout = ({children}) => {
    return ( <Container><Header/>{children}</Container> );
}
 
export default layout;