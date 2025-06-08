package org.jeecg.modules.demo.screen.service.impl;

import lombok.RequiredArgsConstructor;
import org.jeecg.modules.demo.screen.entity.*;
import org.jeecg.modules.demo.screen.mapper.ScreenLeftThreeMapper;
import org.jeecg.modules.demo.screen.service.IScreenLeftThreeService;
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
public class ScreenLeftThreeServiceImpl implements IScreenLeftThreeService {
    private final ScreenLeftThreeMapper screenLeftThreeMapper;

    @Override
    public ScreenLeftThree getLeftThreeDatas(String timeRange) {
        // 'year', 'last12', 'currentYear'
        ScreenLeftThree screenLeftThree = new ScreenLeftThree();
        if(timeRange.equals("year")) {
            List<ScreenLeftThreeX> screenLeftThreeXES = screenLeftThreeMapper.selectScreenLeftThreeX_1();
            List<ScreenLeftThreeY> screenLeftThreeYS =  screenLeftThreeMapper.selectScreenLeftThreeY_1();
            screenLeftThree.setScreenLeftThreeXES(screenLeftThreeXES);
            screenLeftThree.setScreenLeftThreeYS(screenLeftThreeYS);
        }else if(timeRange.equals("last12")) {
            List<ScreenLeftThreeX> screenLeftThreeXES = screenLeftThreeMapper.selectScreenLeftThreeX_2();
            List<ScreenLeftThreeY> screenLeftThreeYS =  screenLeftThreeMapper.selectScreenLeftThreeY_2();
            screenLeftThree.setScreenLeftThreeXES(screenLeftThreeXES);
            screenLeftThree.setScreenLeftThreeYS(screenLeftThreeYS);
        }else if(timeRange.equals("currentYear")) {
            List<ScreenLeftThreeX> screenLeftThreeXES = screenLeftThreeMapper.selectScreenLeftThreeX_3();
            List<ScreenLeftThreeY> screenLeftThreeYS =  screenLeftThreeMapper.selectScreenLeftThreeY_3();
            screenLeftThree.setScreenLeftThreeXES(screenLeftThreeXES);
            screenLeftThree.setScreenLeftThreeYS(screenLeftThreeYS);
        }else {
            List<ScreenLeftThreeX> screenLeftThreeXES = screenLeftThreeMapper.selectScreenLeftThreeX_1();
            List<ScreenLeftThreeY> screenLeftThreeYS =  screenLeftThreeMapper.selectScreenLeftThreeY_1();
            screenLeftThree.setScreenLeftThreeXES(screenLeftThreeXES);
            screenLeftThree.setScreenLeftThreeYS(screenLeftThreeYS);
        }
        return screenLeftThree;
    }
}
