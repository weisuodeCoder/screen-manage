-- 注意：该页面对应的前台目录为views/rightOneData文件夹下
-- 如果你想更改到其他目录，请修改sql中component字段对应的值


INSERT INTO sys_permission(id, parent_id, name, url, component, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_route, is_leaf, keep_alive, hidden, hide_tab, description, status, del_flag, rule_flag, create_by, create_time, update_by, update_time, internal_or_external) 
VALUES ('2025060209039420430', NULL, '右一数据', '/rightOneData/screenRightOneDataList', 'rightOneData/ScreenRightOneDataList', NULL, NULL, 0, NULL, '1', 0.00, 0, NULL, 1, 0, 0, 0, 0, NULL, '1', 0, 0, 'admin', '2025-06-02 21:03:43', NULL, NULL, 0);

-- 权限控制sql
-- 新增
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209039420431', '2025060209039420430', '添加右一数据', NULL, NULL, 0, NULL, NULL, 2, 'rightOneData:screen_right_one_data:add', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:03:43', NULL, NULL, 0, 0, '1', 0);
-- 编辑
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209039420432', '2025060209039420430', '编辑右一数据', NULL, NULL, 0, NULL, NULL, 2, 'rightOneData:screen_right_one_data:edit', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:03:43', NULL, NULL, 0, 0, '1', 0);
-- 删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209039420433', '2025060209039420430', '删除右一数据', NULL, NULL, 0, NULL, NULL, 2, 'rightOneData:screen_right_one_data:delete', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:03:43', NULL, NULL, 0, 0, '1', 0);
-- 批量删除
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209039420434', '2025060209039420430', '批量删除右一数据', NULL, NULL, 0, NULL, NULL, 2, 'rightOneData:screen_right_one_data:deleteBatch', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:03:43', NULL, NULL, 0, 0, '1', 0);
-- 导出excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209039420435', '2025060209039420430', '导出excel_右一数据', NULL, NULL, 0, NULL, NULL, 2, 'rightOneData:screen_right_one_data:exportXls', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:03:43', NULL, NULL, 0, 0, '1', 0);
-- 导入excel
INSERT INTO sys_permission(id, parent_id, name, url, component, is_route, component_name, redirect, menu_type, perms, perms_type, sort_no, always_show, icon, is_leaf, keep_alive, hidden, hide_tab, description, create_by, create_time, update_by, update_time, del_flag, rule_flag, status, internal_or_external)
VALUES ('2025060209039420436', '2025060209039420430', '导入excel_右一数据', NULL, NULL, 0, NULL, NULL, 2, 'rightOneData:screen_right_one_data:importExcel', '1', NULL, 0, NULL, 1, 0, 0, 0, NULL, 'admin', '2025-06-02 21:03:43', NULL, NULL, 0, 0, '1', 0);