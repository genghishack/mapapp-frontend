import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { API } from 'aws-amplify';

import { setResources } from '../../redux/actions/resources';
import { setError } from '../../redux/actions/errors';
import ResourceMap from '../ResourceMap/ResourceMap';
import MenuTree from '../MenuTree/MenuTree';
import InfoBox from '../InfoBox/InfoBox';

interface IResourceViewProps {
  dispatch: Function;
}

const ResourceView = (props: IResourceViewProps) => {
  const { dispatch } = props;

  // const [infoTrayExpanded, setInfoTrayExpanded] = useState(false);
  const [resource, setResource] = useState({});

  //@ts-ignore
  useEffect(() => {
    const getMapMarkers = async () => {
      let resources = {data: []};
      try {
        resources = await API.get('mapapp', '/resource', {});
        dispatch(setResources(resources.data));
      } catch (e) {
        dispatch(setError(e));
      }
    }
    // const getListOfMarkers = async () => {
    //   let list = {data: ''};
    //   try {
    //     //@ts-ignore
    //     list = await API.get('mapapp', '/resource');
    //     console.log(JSON.stringify(list));
    //   } catch (e) {
    //     dispatch(setError(e));
    //   }
    // }
    getMapMarkers();
    // getListOfMarkers();
  }, [dispatch]);

  const handleResourceSelection = () => {
    //no-op
    setResource({});
  };

  return (
    <div className="ResourceView">
      <div id="main-container">
        <MenuTree
          handleSelection={handleResourceSelection}
        />
        <ResourceMap />
        <InfoBox
          resource={resource}
          /* Comment this line with // to use Infobox as a slider tray
          slide={true}
          expanded={infoTrayExpanded}
          setExpanded={setInfoTrayExpanded}
          //*/
        />
      </div>
    </div>
  )
}

function mapStateToProps(state: { errors: any; resources: any; }) {
  return {
    resources: state.resources,
    errors: state.errors,
  };
}

export default connect(mapStateToProps)(ResourceView);
