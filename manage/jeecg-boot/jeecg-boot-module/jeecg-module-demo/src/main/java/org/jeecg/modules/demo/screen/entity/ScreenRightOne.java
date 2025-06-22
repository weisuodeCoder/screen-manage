package org.jeecg.modules.demo.screen.entity;

import lombok.Data;

import java.util.List;

@Data
public class ScreenRightOne {
    private ScreenRightOneConf screenRightOneConf;
    private List<ScreenRightOneList> screenRightOneList;
}