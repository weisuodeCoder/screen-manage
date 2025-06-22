package org.jeecg.modules.demo.screen.service.impl;

import lombok.RequiredArgsConstructor;
import org.jeecg.modules.demo.screen.entity.ScreenRightOne;
import org.jeecg.modules.demo.screen.entity.ScreenRightOneConf;
import org.jeecg.modules.demo.screen.entity.ScreenRightOneList;
import org.jeecg.modules.demo.screen.mapper.ScreenRightOneMapper;
import org.jeecg.modules.demo.screen.service.IScreenRightOneService;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @Description: 左1分组
 * @Author: jeecg-boot
 * @Date:   2025-06-08
 * @Version: V1.0
 */
@Service
@RequiredArgsConstructor
public class ScreenRightOneServiceImpl implements IScreenRightOneService {
    private final ScreenRightOneMapper screenRightOneMapper;

    @Override
    public ScreenRightOne getRightOneDatas() {
        ScreenRightOne screenRightOne = new ScreenRightOne();
        List<ScreenRightOneList> screenRightOneLists = screenRightOneMapper.selectScreenRightOneList();
        ScreenRightOneConf screenRightOneConf = screenRightOneMapper.selectScreenRightOneConf();

        screenRightOne.setScreenRightOneList(screenRightOneLists);
        screenRightOne.setScreenRightOneConf(screenRightOneConf);

        return screenRightOne;
    }
}
