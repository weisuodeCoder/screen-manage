package org.jeecg.modules.demo.screen.mapper;

import org.apache.ibatis.annotations.Mapper;
import org.jeecg.modules.demo.screen.entity.ScreenRightOneList;
import org.jeecg.modules.demo.screen.entity.ScreenRightOneConf;

import java.util.List;

/**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-08
 * @Version: V1.0
 */
@Mapper // 添加注解
public interface ScreenRightOneMapper {

    // 添加参数timeRange，用于指定时间区间
    List<ScreenRightOneList> selectScreenRightOneList();

    ScreenRightOneConf selectScreenRightOneConf();
}