import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { Helmet } from 'react-helmet';
import { withStore } from '@Store/index';
import * as projectDetailStore from '@Store/projectDetailStore';
import { withRouter } from 'react-router';
import { wait } from 'domain-wait';

import OwnerInfoContainer from '@Components/public-side/owner-info/Owner-Info-Container';
import HorizontalLine from '@Components/common/horizontal-lines/Horizontal-Line';
import WebStatisticsContainer from '@Components/public-side/website-statistics/Website-Statistics-Container';
import ParagraphBasic from '@Components/common/paragraph/Paragraph-Basic';
import AnchorBasic from '@Components/common/anchor-tag/Anchor-Basic';


/**
 * @interface IProps Component's props interface.
 */
interface IProps extends RouteComponentProps<{}> {
    getProjectDetail(): void;
}

/**
 * @interface IProps State's props interface.
 */
interface IState {}

/**
 * @class Entry page component for root route of the web application.
 */
class HomePage extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        wait(async () => {
            // Lets tell Node.js to wait for the request completion.
            // It's necessary when you want to see the fethched data 
            // in your prerendered HTML code (by SSR).
            await this.props.getProjectDetail();
        }, "projectDetailTask");
    }
    render() {

        return (
            <div>
                <Helmet>
                    <meta data-react-helmet="true" name="title" content="E-commerce template | Index"/>
                    <meta property="og:title" content="E-commerce template" />
                    <title>E-commerce template | Index</title>
                </Helmet>

                <div className='container mt-4 page-container'>
             
                    <h1>AspnetCore React Redux E-commerce Template</h1>
                    <ParagraphBasic>Isomorphic Single-page application based on React-Redux ecosystem with integration into AspnetCore. All components are completely containerizated for running in cloud or on-premise environment.</ParagraphBasic>
                    <ParagraphBasic>Prerendering phase is resolved via loadData functions, that must be appended to particular page component (same concept that you might know from <AnchorBasic targetUrl='https://nextjs.org' labelUrl='Next.js'></AnchorBasic> framework).</ParagraphBasic>


                    <div className='mt-4'>
                        <HorizontalLine />
                        <div className='row'>
                            <OwnerInfoContainer />
                            <WebStatisticsContainer />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


// Connect component with Redux store.
const connectedComponent = withStore(
    HomePage,
    state => state.projectDetail, // Selects which state properties are merged into the component's props.
    projectDetailStore.actionCreators, // Selects which action creators are merged into the component's props.
);

// Attach the React Router to the component to have an opportunity
// to interract with it: use some navigation components, 
// have an access to React Router fields in the component's props, etc.
export default withRouter(connectedComponent);


