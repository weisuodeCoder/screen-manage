import { defHttp } from '/@/utils/http/axios';
import { useMessage } from '/@/hooks/web/useMessage';
import { message } from 'ant-design-vue';

const { createConfirm } = useMessage();

enum Api {
  list = '/leftTwoType/screenLeftTwoType/list',
  save = '/leftTwoType/screenLeftTwoType/add',
  edit = '/leftTwoType/screenLeftTwoType/edit',
  deleteOne = '/leftTwoType/screenLeftTwoType/delete',
  deleteBatch = '/leftTwoType/screenLeftTwoType/deleteBatch',
  importExcel = '/leftTwoType/screenLeftTwoType/importExcel',
  exportXls = '/leftTwoType/screenLeftTwoType/exportXls',
}
/**
 * 导出api
 * @param params
 */
export const getExportUrl = Api.exportXls;
/**
 * 导入api
 */
export const getImportUrl = Api.importExcel;
/**
 * 列表接口
 * @param params
 */
export const list = (params) => defHttp.get({ url: Api.list, params });

/**
 * 删除单个
 */
export const deleteOne = (params, handleSuccess) => {
  return defHttp
    .delete({ url: Api.deleteOne, params }, { joinParamsToUrl: true, isTransformResponse: false })
    .then((res) => {
      if (res.success) {
        message.success('删除成功！');
      } else {
        const errMsg = '执行数据库异常,违反了完整性例如：违反惟一约束、违反非空限制、字段内容超出长度等';
        const msg = res.message === errMsg ? '《左2数据配置》中有该条数据的引用，请先删除对应的数据再尝试！' : res.message;
        message.error(msg, 10);
      }
      handleSuccess();
    })
    .catch((error) => {
      message.error('发生错误，请联系管理员');
      handleSuccess();
    });
};
/**
 * 批量删除
 * @param params
 */
export const batchDelete = (params, handleSuccess) => {
  createConfirm({
    iconType: 'warning',
    title: '确认删除',
    content: '是否删除选中数据',
    okText: '确认',
    cancelText: '取消',
    onOk: () => {
      return defHttp.delete({ url: Api.deleteBatch, data: params }, { joinParamsToUrl: true }).then(() => {
        handleSuccess();
      });
    },
  });
};
/**
 * 保存或者更新
 * @param params
 */
export const saveOrUpdate = (params, isUpdate) => {
  let url = isUpdate ? Api.edit : Api.save;
  return defHttp.post({ url: url, params });
};
