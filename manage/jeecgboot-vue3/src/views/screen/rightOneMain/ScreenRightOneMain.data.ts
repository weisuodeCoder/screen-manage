import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { rules } from '/@/utils/helper/validator';
import { render } from '/@/utils/common/renderUtils';
import { getWeekMonthQuarterYear } from '/@/utils';
//列表数据
export const columns: BasicColumn[] = [
  {
    title: '名称',
    align: 'center',
    dataIndex: 'title',
  },
  {
    title: '类型',
    align: 'center',
    dataIndex: 'type_dictText',
  },
  {
    title: '单位',
    align: 'center',
    dataIndex: 'unit',
  },
  {
    title: '排序',
    align: 'center',
    dataIndex: 'sort',
  },
];

// 高级查询数据
export const superQuerySchema = {
  title: { title: '名称', order: 0, view: 'list', type: 'string', dictCode: '' },
  type: { title: '类型', order: 1, view: 'list', type: 'string', dictCode: 'screen_right_one_type' },
  unit: { title: '单位', order: 2, view: 'text', type: 'string' },
  sort: { title: '排序', order: 3, view: 'number', type: 'number' },
};
