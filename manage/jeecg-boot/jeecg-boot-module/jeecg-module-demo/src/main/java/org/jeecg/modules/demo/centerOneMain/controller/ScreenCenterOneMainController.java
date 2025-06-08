package org.jeecg.modules.demo.centerOneMain.controller;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.system.query.QueryRuleEnum;
import org.jeecg.common.util.oConvertUtils;
import org.jeecg.modules.demo.centerOneMain.entity.ScreenCenterOneMain;
import org.jeecg.modules.demo.centerOneMain.service.IScreenCenterOneMainService;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import lombok.extern.slf4j.Slf4j;

import org.jeecgframework.poi.excel.ExcelImportUtil;
import org.jeecgframework.poi.excel.def.NormalExcelConstants;
import org.jeecgframework.poi.excel.entity.ExportParams;
import org.jeecgframework.poi.excel.entity.ImportParams;
import org.jeecgframework.poi.excel.view.JeecgEntityExcelView;
import org.jeecg.common.system.base.controller.JeecgController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.servlet.ModelAndView;
import com.alibaba.fastjson.JSON;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.Operation;
import org.jeecg.common.aspect.annotation.AutoLog;
import org.apache.shiro.authz.annotation.RequiresPermissions;

 /**
 * @Description: 中一配置
 * @Author: jeecg-boot
 * @Date:   2025-06-07
 * @Version: V1.0
 */
@Tag(name="中一配置")
@RestController
@RequestMapping("/centerOneMain/screenCenterOneMain")
@Slf4j
public class ScreenCenterOneMainController extends JeecgController<ScreenCenterOneMain, IScreenCenterOneMainService> {
	@Autowired
	private IScreenCenterOneMainService screenCenterOneMainService;
	
	/**
	 * 分页列表查询
	 *
	 * @param screenCenterOneMain
	 * @param pageNo
	 * @param pageSize
	 * @param req
	 * @return
	 */
	//@AutoLog(value = "中一配置-分页列表查询")
	@Operation(summary="中一配置-分页列表查询")
	@GetMapping(value = "/list")
	public Result<IPage<ScreenCenterOneMain>> queryPageList(ScreenCenterOneMain screenCenterOneMain,
								   @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
								   @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
								   HttpServletRequest req) {
        QueryWrapper<ScreenCenterOneMain> queryWrapper = QueryGenerator.initQueryWrapper(screenCenterOneMain, req.getParameterMap());
		Page<ScreenCenterOneMain> page = new Page<ScreenCenterOneMain>(pageNo, pageSize);
		IPage<ScreenCenterOneMain> pageList = screenCenterOneMainService.page(page, queryWrapper);
		return Result.OK(pageList);
	}
	
	/**
	 *   添加
	 *
	 * @param screenCenterOneMain
	 * @return
	 */
	@AutoLog(value = "中一配置-添加")
	@Operation(summary="中一配置-添加")
	@PostMapping(value = "/add")
	public Result<String> add(@RequestBody ScreenCenterOneMain screenCenterOneMain) {
		screenCenterOneMainService.save(screenCenterOneMain);
		return Result.OK("添加成功！");
	}
	
	/**
	 *  编辑
	 *
	 * @param screenCenterOneMain
	 * @return
	 */
	@AutoLog(value = "中一配置-编辑")
	@Operation(summary="中一配置-编辑")
	@RequestMapping(value = "/edit", method = {RequestMethod.PUT,RequestMethod.POST})
	public Result<String> edit(@RequestBody ScreenCenterOneMain screenCenterOneMain) {
		screenCenterOneMainService.updateById(screenCenterOneMain);
		return Result.OK("编辑成功!");
	}
	
	/**
	 *   通过id删除
	 *
	 * @param id
	 * @return
	 */
	@AutoLog(value = "中一配置-通过id删除")
	@Operation(summary="中一配置-通过id删除")
	@DeleteMapping(value = "/delete")
	public Result<String> delete(@RequestParam(name="id",required=true) String id) {
		screenCenterOneMainService.removeById(id);
		return Result.OK("删除成功!");
	}
	
	/**
	 *  批量删除
	 *
	 * @param ids
	 * @return
	 */
	@AutoLog(value = "中一配置-批量删除")
	@Operation(summary="中一配置-批量删除")
	@DeleteMapping(value = "/deleteBatch")
	public Result<String> deleteBatch(@RequestParam(name="ids",required=true) String ids) {
		this.screenCenterOneMainService.removeByIds(Arrays.asList(ids.split(",")));
		return Result.OK("批量删除成功!");
	}
	
	/**
	 * 通过id查询
	 *
	 * @param id
	 * @return
	 */
	//@AutoLog(value = "中一配置-通过id查询")
	@Operation(summary="中一配置-通过id查询")
	@GetMapping(value = "/queryById")
	public Result<ScreenCenterOneMain> queryById(@RequestParam(name="id",required=true) String id) {
		ScreenCenterOneMain screenCenterOneMain = screenCenterOneMainService.getById(id);
		if(screenCenterOneMain==null) {
			return Result.error("未找到对应数据");
		}
		return Result.OK(screenCenterOneMain);
	}

    /**
    * 导出excel
    *
    * @param request
    * @param screenCenterOneMain
    */
    @RequestMapping(value = "/exportXls")
    public ModelAndView exportXls(HttpServletRequest request, ScreenCenterOneMain screenCenterOneMain) {
        return super.exportXls(request, screenCenterOneMain, ScreenCenterOneMain.class, "中一配置");
    }

    /**
      * 通过excel导入数据
    *
    * @param request
    * @param response
    * @return
    */
    @RequestMapping(value = "/importExcel", method = RequestMethod.POST)
    public Result<?> importExcel(HttpServletRequest request, HttpServletResponse response) {
        return super.importExcel(request, response, ScreenCenterOneMain.class);
    }

}
