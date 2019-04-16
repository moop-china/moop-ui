import React, { Fragment, useEffect, useState } from 'react';
import { Dialog, Tag, Button, Grid, Checkbox } from '@alifd/next';
import { project } from '@/utils/api';

const { Row, Col } = Grid;
const { Group: TagGroup, Selectable: SelectableTag } = Tag;

const AddDialog = ({ save }) => {
  const [visible, setVisible] = useState(false);
  const [categories, setCategories] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selected, setSelected] = useState([]);
  const onOk = () => {
    save([...selected]);
    setVisible(false);
  };
  const onChange = (isSelected, id) => {
    if (isSelected) {
      if (selected.indexOf(id) === -1) {
        setSelected([...selected, id]);
      }
    } else {
      const index = selected.findIndex(oldId => oldId === id);
      if (index !== -1) {
        selected.splice(index, 1);
        setSelected(selected);
      }
    }
  };
  const queryProjects = (id) => {
    project.selectAll({ params: { tag: id } }).then(({ data }) => {
      setProjects(data.projects);
    });
  };

  useEffect(() => {
    project.categories().then(({ data }) => {
      setCategories(data);
    });
  }, []);

  return (
    <Fragment>
      <Button onClick={() => setVisible(true)}>添加实验模板</Button>
      <Dialog title="选择实验模版" shouldUpdatePosition closeable={false} hasMask={false} visible={visible} onOk={onOk} onCancel={() => setVisible(false)} style={{ width: 680 }}>
        <TagGroup>
          {categories.reduce((all, { type }) => all.concat(type.map(({ id, name, count }) => (
            <SelectableTag key={id} onChange={() => queryProjects(id)} title={`${name}(${count})`}>{name}({count})</SelectableTag>
          ))), [])}
        </TagGroup>
        <Row>
          {projects.map(p => (
            <Col span={12} key={p.id}>
              <Checkbox onChange={isSelected => onChange(isSelected, p.id)}>{p.title}</Checkbox>
            </Col>
          ))}
        </Row>
      </Dialog>
    </Fragment>
  );
};

export default (current, formValues) => {
  return [{
    label: '选择实验',
    required: true,
    render: () => <AddDialog save={data => formValues[current] = data} />,
  }];
};