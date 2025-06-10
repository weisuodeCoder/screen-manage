package org.jeecg.modules.demo.screen.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.jeecg.common.api.vo.Result;
import org.jeecg.common.system.query.QueryGenerator;
import org.jeecg.common.system.query.QueryRuleEnum;
import org.jeecg.modules.demo.centerOneData.entity.ScreenCenterOneData;
import org.jeecg.modules.demo.centerOneData.service.IScreenCenterOneDataService;
import org.jeecg.modules.demo.centerTwo.entity.ScreenCenterTwo;
import org.jeecg.modules.demo.centerTwo.service.IScreenCenterTwoService;
import org.jeecg.modules.demo.rightThree.entity.ScreenRightThree;
import org.jeecg.modules.demo.rightThree.service.IScreenRightThreeService;
import org.jeecg.modules.demo.rightTwoData.entity.ScreenRightTwoData;
import org.jeecg.modules.demo.rightTwoData.service.IScreenRightTwoDataService;
import org.jeecg.modules.demo.screen.entity.*;
import org.jeecg.modules.demo.screen.service.IScreenCenterOneService;
import org.jeecg.modules.demo.screen.service.IScreenLeftOneService;
import org.jeecg.modules.demo.screen.service.IScreenLeftTwoService;
import org.jeecg.modules.demo.screen.service.IScreenRightOneService;
import org.jeecg.modules.demo.screen.service.impl.ScreenLeftThreeServiceImpl;
import org.jeecg.modules.demo.titles.entity.ScreenTitles;
import org.jeecg.modules.demo.titles.service.IScreenTitlesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Tag(name="大屏页面请求")
@RestController
@RequestMapping("/anon/screen")
@Slf4j
@CrossOrigin(origins = "*", methods = {RequestMethod.GET})
public class AnonScreen {
    @Autowired
    private IScreenTitlesService screenTitlesService;
    @Autowired
    private IScreenLeftOneService screenLeftOneService;
    @Autowired
    private IScreenLeftTwoService screenLeftTwoService;
    @Autowired
    private ScreenLeftThreeServiceImpl screenLeftThreeService;
    @Autowired
    private IScreenRightOneService screenRightOneService;
    @Autowired
    private IScreenRightTwoDataService screenRightTwoDataService;
    @Autowired
    private IScreenRightThreeService screenRightThreeService;
    @Autowired
    private IScreenCenterTwoService screenCenterTwoService;
    @Autowired
    private IScreenCenterOneService screenCenterOneService;
    @Autowired
    private IScreenCenterOneDataService screenCenterOneDataService;

    @Operation(summary="大屏页面标题设置-分页列表查询")
    @GetMapping(value = "/getTitleList")
    public Result<IPage<ScreenTitles>> getTitles(ScreenTitles screenTitles,
                                                 @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
                                                 @RequestParam(name="pageSize", defaultValue="100") Integer pageSize,
                                                 HttpServletRequest req) {
        QueryWrapper<ScreenTitles> queryWrapper = QueryGenerator.initQueryWrapper(screenTitles, req.getParameterMap());
        Page<ScreenTitles> page = new Page<ScreenTitles>(pageNo, pageSize);
        IPage<ScreenTitles> pageList = screenTitlesService.page(page, queryWrapper);
        return Result.OK(pageList);
    }

    @Operation(summary="大屏-左1数据")
    @GetMapping(value = "/getLeftOneDatas")
    public Result<List<ScreenLeftOne>> getLeftOneDatas(HttpServletRequest req) {
        List<ScreenLeftOne> leftOneDatas = screenLeftOneService.getLeftOneDatas();
        return Result.OK(leftOneDatas);
    }

    @Operation(summary="大屏-左2数据")
    @GetMapping(value = "/getLeftTwoDatas")
    public Result<ScreenLeftTwo> getLeftTwoDatas(@RequestParam(name="type", defaultValue="1")String type) {
        ScreenLeftTwo leftTwoDatas = screenLeftTwoService.getLeftTwoDatas(type);
        return Result.OK(leftTwoDatas);
    };

    @Operation(summary="大屏-左3数据")
    @GetMapping(value = "/getLeftThreeDatas")
    public Result<ScreenLeftThree> getLeftThreeDatas(@RequestParam(name="timeRange", defaultValue="year")String timeRange) {
        ScreenLeftThree leftThreeDatas = screenLeftThreeService.getLeftThreeDatas(timeRange);
        return Result.OK(leftThreeDatas);
    };

    @Operation(summary="大屏-右1数据")
    @GetMapping(value = "/getRightOneDatas")
    public Result<List<ScreenRightOne>> getRightOneDatas() {
        List<ScreenRightOne> rightOneDatas = screenRightOneService.getRightOneDatas();
        return Result.OK(rightOneDatas);
    };

    @Operation(summary="大屏右2-分页列表查询")
    @GetMapping(value = "/getRightTwoDatas")
    public Result<IPage<ScreenRightTwoData>> queryPageList(ScreenRightTwoData screenRightTwoData,
                                                           @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
                                                           @RequestParam(name="pageSize", defaultValue="100") Integer pageSize,
                                                           HttpServletRequest req) {
        QueryWrapper<ScreenRightTwoData> queryWrapper = QueryGenerator.initQueryWrapper(screenRightTwoData, req.getParameterMap());
        Page<ScreenRightTwoData> page = new Page<ScreenRightTwoData>(pageNo, pageSize);
        IPage<ScreenRightTwoData> pageList = screenRightTwoDataService.page(page, queryWrapper);
        return Result.OK(pageList);
    }

    @Operation(summary="大屏右3-分页列表查询")
    @GetMapping(value = "/getRightThreeDatas")
    public Result<IPage<ScreenRightThree>> queryPageList(ScreenRightThree screenRightThree,
                                                         @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
                                                         @RequestParam(name="pageSize", defaultValue="10") Integer pageSize,
                                                         HttpServletRequest req) {
        // 自定义查询规则
        Map<String, QueryRuleEnum> customeRuleMap = new HashMap<>();
        // 自定义多选的查询规则为：LIKE_WITH_OR
        customeRuleMap.put("type", QueryRuleEnum.LIKE_WITH_OR);
        QueryWrapper<ScreenRightThree> queryWrapper = QueryGenerator.initQueryWrapper(screenRightThree, req.getParameterMap(),customeRuleMap);
        Page<ScreenRightThree> page = new Page<ScreenRightThree>(pageNo, pageSize);
        IPage<ScreenRightThree> pageList = screenRightThreeService.page(page, queryWrapper);
        return Result.OK(pageList);
    }

    @Operation(summary="大屏-中1数据")
    @GetMapping(value = "/getCenterOneDatas")
    public Result<List<ScreenCenterOne>> getCenterOneDatas() {
        List<ScreenCenterOne> centerOneDatas = screenCenterOneService.getCenterOneDatas();
        return Result.OK(centerOneDatas);
    }

    @Operation(summary="中一数据-分页列表查询")
    @GetMapping(value = "/getCenterOneModel")
    public Result<IPage<ScreenCenterOneData>> getCenterOneModel(ScreenCenterOneData screenCenterOneData,
                                                                @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
                                                                @RequestParam(name="pageSize", defaultValue="1000") Integer pageSize,
                                                                HttpServletRequest req) {
        // 自定义查询规则
        Map<String, QueryRuleEnum> customeRuleMap = new HashMap<>();
        // 自定义多选的查询规则为：LIKE_WITH_OR
        customeRuleMap.put("groupId", QueryRuleEnum.LIKE_WITH_OR);
        QueryWrapper<ScreenCenterOneData> queryWrapper = QueryGenerator.initQueryWrapper(screenCenterOneData, req.getParameterMap(),customeRuleMap);
        Page<ScreenCenterOneData> page = new Page<ScreenCenterOneData>(pageNo, pageSize);
        IPage<ScreenCenterOneData> pageList = screenCenterOneDataService.page(page, queryWrapper);
        return Result.OK(pageList);
    }

    @Operation(summary="大屏-中二数据")
    @GetMapping(value = "/getCenterTwoDatas")
    public Result<IPage<ScreenCenterTwo>> getCenterTwoDatas(ScreenCenterTwo screenCenterTwo,
                                                        @RequestParam(name="pageNo", defaultValue="1") Integer pageNo,
                                                        @RequestParam(name="pageSize", defaultValue="100") Integer pageSize,
                                                        HttpServletRequest req) {
        QueryWrapper<ScreenCenterTwo> queryWrapper = QueryGenerator.initQueryWrapper(screenCenterTwo, req.getParameterMap());
        Page<ScreenCenterTwo> page = new Page<ScreenCenterTwo>(pageNo, pageSize);
        IPage<ScreenCenterTwo> pageList = screenCenterTwoService.page(page, queryWrapper);
        return Result.OK(pageList);
    }
}