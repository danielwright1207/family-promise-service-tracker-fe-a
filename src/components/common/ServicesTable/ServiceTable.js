import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {
  Table,
  Input,
  Typography,
  Form,
  Space,
  Popconfirm,
  Select,
  Button,
} from 'antd';
import {
  LoadingOutlined,
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
} from '@ant-design/icons';

// Action Imports
import {
  getAllServicesAction,
  getAllRecipientAction,
  getAllServiceTypesAction,
  deleteServiceAction,
  editServiceAction,
  getServiceByIdAction,
  addRecipientAction,
  editRecipientAction,
  deleteRecipientAction,
} from '../../../state/actions';

const ServicesTable = ({
  getAllServicesAction,
  deleteServiceAction,
  editServiceAction,
  getServiceByIdAction,
  getRecipientByIdAction,
  getAllRecipientAction,
  getAllServiceTypesAction,
  editRecipientAction,
  deleteRecipientAction,
  services,
  serviceTypes,
  recipient,
  change,
}) => {
  const [form] = Form.useForm();
  const [editingKey, setEditingKey] = useState('');
  const [sortedInfo, setSortedInfo] = useState('');
  const [filteredInfo, setFilteredInfo] = useState('');

  useEffect(() => {
    getAllRecipientAction();
    getAllServicesAction();
    getAllServiceTypesAction();
  }, [change]);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    setFilteredInfo(filters);
  };

  const clearFilters = () => {
    setFilteredInfo(null);
  };

  const clearAll = () => {
    setSortedInfo(null);
    setFilteredInfo(null);
  };

  const setAgeSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'age',
    });
  };

  const setFirstNameSort = () => {
    setSortedInfo({
      order: 'descend',
      columnKey: 'first_name',
    });
  };

  const isEditing = record => record.id === editingKey;

  const edit = record => {
    form.setFieldsValue({
      first_name: '',
      last_name: '',
      serviceType: '',
      unit: '',
      quantity: '',
      value: '',
      status: '',
      address: '',
      city: '',
      state: '',
      zip_code: '',
      date: '',
      notes: '',
      ...record,
    });
    setEditingKey(record.id);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const deleteService = key => {
    deleteServiceAction(key);
  };

  const save = async serviceId => {
    try {
      const serviceObj = await form.validateFields();
      editServiceAction(serviceId, serviceObj);
      setEditingKey('');
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
      editable: false,
      filteredValue: filteredInfo.first_name || null,
      sorter: (a, b) =>
        a.recipient.first_name.localeCompare(b.recipient.first_name),
      sortOrder: sortedInfo.columnKey === 'first_name' && sortedInfo.order,
      ellipsis: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            first_name="first_name"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please input a first name!`,
              },
            ]}
          >
            <Input defaultValue={record.recipient.first_name} />
          </Form.Item>
        ) : (
          <>{record.recipient.first_name}</>
        );
      },
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
      filteredValue: filteredInfo.last_name || null,
      sorter: (a, b) =>
        a.recipient.last_name.localeCompare(b.recipient.last_name),
      sortOrder: sortedInfo.columnKey === 'last_name' && sortedInfo.order,
      ellipsis: true,
      editable: false,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            last_name="last_name"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please input a last name!`,
              },
            ]}
          >
            <Input defaultValue={record.recipient.last_name} />
          </Form.Item>
        ) : (
          <>{record.recipient.last_name}</>
        );
      },
    },
    {
      title: 'Service Type',
      dataIndex: 'serviceType',
      key: 'serviceType',
      filteredValue: filteredInfo.serviceType || null,
      onFilter: (value, record) => record.service_type.name.includes(value),
      sorter: (a, b) => a.service_type.name.localeCompare(b.service_type.name),
      sortOrder: sortedInfo.columnKey === 'serviceType' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="service_type_id"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please input an service type!`,
              },
            ]}
          >
            <Input defaultValue={record.service_type.name} />
          </Form.Item>
        ) : (
          <>{record.service_type.name}</>
        );
      },
    },
    {
      title: 'Unit',
      dataIndex: 'unit',
      key: 'unit',
      filteredValue: filteredInfo.unit || null,
      onFilter: (value, record) => record.unit.includes(value),
      sorter: (a, b) => a.unit.localeCompare(b.unit),
      sortOrder: sortedInfo.columnKey === 'unit' && sortedInfo.order,
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="unit"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please select a unit',
              },
            ]}
          >
            <Input defaultValue={record.unit} />
          </Form.Item>
        ) : (
          <>{record.unit}</>
        );
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      sorter: (a, b) => a.quantity - b.quantity,
      sortOrder: sortedInfo.columnKey === 'quantity' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="quantity"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please select a quantity',
              },
            ]}
          >
            <Input defaultValue={record.quantity} />
          </Form.Item>
        ) : (
          <>{record.quantity}</>
        );
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      sorter: (a, b) => a.value - b.value,
      sortOrder: sortedInfo.columnKey === 'value' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="value"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please select a value',
              },
            ]}
          >
            <Input defaultValue={record.value} />
          </Form.Item>
        ) : (
          <>{record.value}</>
        );
      },
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      filters: [
        { text: 'Complete', value: 'Complete' },
        { text: 'In Progress', value: 'In Progress' },
        { text: 'Needs Follow-Up', value: 'Needs Follow-Up' },
        { text: 'Not Started', value: 'Not Started' },
      ],
      filteredValue: filteredInfo.status || null,
      onFilter: (value, record) => record.status.name.includes(value),
      sortOrder: sortedInfo.columnKey === 'status' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="value"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please select a status`,
              },
            ]}
          >
            {/* <Input defaultValue={record.status.name} /> */}
            <Select size="middle" mode="multiple">
              {services.map(item => (
                <Select.Option key={item} value={item.id}>
                  {item.status.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        ) : (
          <>{record.status.name}</>
        );
      },
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      filteredValue: filteredInfo.address || null,
      onFilter: (value, record) => record.address.includes(value),
      sorter: (a, b) => a.address.localeCompare(b.address),
      sortOrder: sortedInfo.columnKey === 'address' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="address"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please input an address',
              },
            ]}
          >
            <Input defaultValue={record.address} />
          </Form.Item>
        ) : (
          <>{record.address}</>
        );
      },
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      filteredValue: filteredInfo.city || null,
      onFilter: (value, record) => record.city.includes(value),
      sorter: (a, b) => a.city.localeCompare(b.city),
      sortOrder: sortedInfo.columnKey === 'city' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="city"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please input a city',
              },
            ]}
          >
            <Input defaultValue={record.city} />
          </Form.Item>
        ) : (
          <>{record.city}</>
        );
      },
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state',
      filteredValue: filteredInfo.state || null,
      onFilter: (value, record) => record.state.includes(value),
      sorter: (a, b) => a.state.localeCompare(b.state),
      sortOrder: sortedInfo.columnKey === 'state' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="state"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please input a state',
              },
            ]}
          >
            <Input defaultValue={record.state} />
          </Form.Item>
        ) : (
          <>{record.state}</>
        );
      },
    },
    {
      title: 'Zip Code',
      dataIndex: 'zip_code',
      key: 'zip_code',
      sorter: (a, b) => a.zip_code - b.zip_code,
      sortOrder: sortedInfo.columnKey === 'zip_code' && sortedInfo.order,
      ellipsis: true,
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="state"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please input a zip code',
              },
            ]}
          >
            <Input defaultValue={record.zip_code} />
          </Form.Item>
        ) : (
          <>{record.zip_code}</>
        );
      },
    },
    {
      title: 'Date & time',
      dataIndex: 'date',
      key: 'date',
      // sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix(),
      // sortOrder: sortedInfo.columnKey === 'date' && sortedInfo.order,
      // ellipsis: true,
      editable: false,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="date"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please select a date and time',
              },
            ]}
          >
            <Input defaultValue={record.provided_at} />
            {/* <Select size="middle">
              {services.map(item => (
                <Select.Option key={item} value={item.id}>
                  {item.provided_at}
                </Select.Option>
              ))}
            </Select> */}
          </Form.Item>
        ) : (
          <>{record.provided_at}</>
        );
      },
    },
    {
      title: 'Notes',
      dataIndex: 'notes',
      key: 'notes',
      editable: true,
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Form.Item
            name="notes"
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: 'Please select a notes',
              },
            ]}
          >
            <Input defaultValue={record.notes} />
            {/* <Select size="middle" mode="multiple">
              {services.map(item => (
                <Select.Option key={item} value={item.id}>
                  {item.notes}
                </Select.Option>
              ))}
            </Select> */}
          </Form.Item>
        ) : (
          <>{record.notes}</>
        );
      },
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Space size="middle">
              <a
                onClick={() => save(record.id)}
                style={{ color: '#1890FF', marginRight: 8 }}
              >
                Save
              </a>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a style={{ color: '#1890FF' }}>Cancel</a>
              </Popconfirm>
            </Space>
          </span>
        ) : (
          <Space size="large">
            <Typography.Link
              disabled={editingKey !== ''}
              style={{ color: '#1890FF' }}
              onClick={() => edit(record)}
            >
              {<EditOutlined />}
            </Typography.Link>

            <Popconfirm
              title="Sure to delete?"
              onConfirm={() => {
                deleteService(record.id);
              }}
              danger
            >
              {<DeleteOutlined />}
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <div className="servicesTable">
      {services.length < 1 && <LoadingOutlined className="loader" />},
      {services.length >= 1 && (
        <Form form={form}>
          <Space style={{ marginBottom: 16 }}>
            <Button onClick={setFirstNameSort}>Sort Name</Button>
            <Button onClick={setAgeSort}>Sort age</Button>
            <Button onClick={clearFilters}>Clear filters</Button>
            <Button onClick={clearAll}>Clear filters and sorters</Button>
          </Space>
          <Table
            className="desktop-table"
            columns={columns}
            dataSource={services}
            size="small"
            tableLayout="fixed"
            onChange={handleChange}
          />
        </Form>
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    recipient: state.recipient.recipients,
    services: state.service.services,
    serviceTypes: state.service.serviceTypes,
    change: state.recipient.change,
  };
};

export default connect(mapStateToProps, {
  getAllServicesAction,
  deleteServiceAction,
  editServiceAction,
  getServiceByIdAction,
  getAllRecipientAction,
  getAllServiceTypesAction,
  addRecipientAction,
  editRecipientAction,
  deleteRecipientAction,
})(ServicesTable);
