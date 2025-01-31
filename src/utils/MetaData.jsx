import { Helmet } from "react-helmet";

const MetaData = ({title}) => (
    //This react helmet library used to specify the title of each page
    <Helmet>
        <title>{title}</title>
    </Helmet>
)


export default MetaData;