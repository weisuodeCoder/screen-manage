-- 注意：该页面对应的前台目录为views/leftThreeData文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2025060204209640130', NULL, '左三数据', '/leftThreeData/screenLeftThreeDataList', 'leftThreeData/ScreenLeftThreeDataList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2025-06-02 16:20:13', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060204209650131', '2025060204209640130', '添加左三数据', NULL, NULL, 0, NULL, NULL, 2, 'leftThreeData:screen_left_three_data:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 16:20:13', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060204209650132', '2025060204209640130', '编辑左三数据', NULL, NULL, 0, NULL, NULL, 2, 'leftThreeData:screen_left_three_data:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 16:20:13', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060204209650133', '2025060204209640130', '删除左三数据', NULL, NULL, 0, NULL, NULL, 2, 'leftThreeData:screen_left_three_data:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 16:20:13', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060204209650134', '2025060204209640130', '批量删除左三数据', NULL, NULL, 0, NULL, NULL, 2, 'leftThreeData:screen_left_three_data:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 16:20:13', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060204209650135', '2025060204209640130', '导出excel_左三数据', NULL, NULL, 0, NULL, NULL, 2, 'leftThreeData:screen_left_three_data:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 16:20:13', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060204209650136', '2025060204209640130', '导入excel_左三数据', NULL, NULL, 0, NULL, NULL, 2, 'leftThreeData:screen_left_three_data:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 16:20:13', NULL, NULL, 0, 0, '1', 0);