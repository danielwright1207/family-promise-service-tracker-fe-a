import React, { useState, useEffect } from 'react';
import { Button } from 'antd';

//redux import
import {
  addServiceAction,
  getServiceProviders,
  getServiceTypes,
  getAllProgramsAction,
} from '../../../state/actions/index';

import { getAllRecipientAction } from '../../../state/actions/recipientActions';
import { addServiceTypeAction } from '../../../state/actions/ServiceTypeActions';
import { connect } from 'react-redux';

//component import
import AddServiceForm from '../../forms/AddServiceForm';
import AddServiceTypeForm from '../../forms/AddServiceTypeForm';

//addServiceTypeAction
function RenderServicesPage({
  addServiceAction,
  getServiceProviders,
  getAllRecipientAction,
  getServiceTypes,
  getAllProgramsAction,
  addServiceTypeAction,
}) {
  const [visible, setVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);

  useEffect(() => {
    getServiceProviders();
    getAllRecipientAction();
    getServiceTypes();
    getAllProgramsAction();
    addServiceTypeAction();
  }, []);

  const onCreate = values => {
    setVisible(false);
    addServiceAction(values);
  };

  const onCreateType = values => {
    setTypeVisible(false);
    addServiceTypeAction(values);
  };

  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={() => {
            setTypeVisible(true);
          }}
        >
          Add Service Type
        </Button>
        <AddServiceTypeForm
          visible={typeVisible}
          onCreate={onCreateType}
          onCancel={() => {
            setTypeVisible(false);
          }}
        />
      </div>

      <div>
        <Button
          type="primary"
          onClick={() => {
            setVisible(true);
          }}
        >
          Log Service
        </Button>
        <AddServiceForm
          visible={visible}
          onCreate={onCreate}
          onCancel={() => {
            setVisible(false);
          }}
        />
      </div>
    </>
  );
}

const mapStateToProps = state => {
  return {
    serviceProviders: state.service.serviceProviders,
    serviceTypes: state.service.serviceTypes,
    recipients: state.recipient.recipients,
    programs: state.program.programs,
  };
};

export default connect(mapStateToProps, {
  addServiceAction,
  addServiceTypeAction,
  getServiceProviders,
  getAllRecipientAction,
  getServiceTypes,
  getAllProgramsAction,
})(RenderServicesPage);
