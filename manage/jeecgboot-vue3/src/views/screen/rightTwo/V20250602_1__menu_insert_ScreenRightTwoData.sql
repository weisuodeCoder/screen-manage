-- 注意：该页面对应的前台目录为views/rightTwoData文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2025060209129260310', NULL, '右二数据', '/rightTwoData/screenRightTwoDataList', 'rightTwoData/ScreenRightTwoDataList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2025-06-02 21:12:31', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209129260311', '2025060209129260310', '添加右二数据', NULL, NULL, 0, NULL, NULL, 2, 'rightTwoData:screen_right_two_data:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:12:31', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209129260312', '2025060209129260310', '编辑右二数据', NULL, NULL, 0, NULL, NULL, 2, 'rightTwoData:screen_right_two_data:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:12:31', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209129260313', '2025060209129260310', '删除右二数据', NULL, NULL, 0, NULL, NULL, 2, 'rightTwoData:screen_right_two_data:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:12:31', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209129260314', '2025060209129260310', '批量删除右二数据', NULL, NULL, 0, NULL, NULL, 2, 'rightTwoData:screen_right_two_data:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:12:31', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209129260315', '2025060209129260310', '导出excel_右二数据', NULL, NULL, 0, NULL, NULL, 2, 'rightTwoData:screen_right_two_data:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:12:31', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209129260316', '2025060209129260310', '导入excel_右二数据', NULL, NULL, 0, NULL, NULL, 2, 'rightTwoData:screen_right_two_data:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:12:31', NULL, NULL, 0, 0, '1', 0);