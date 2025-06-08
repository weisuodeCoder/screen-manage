package org.jeecg.modules.demo.screen.entity;

import lombok.Data;

import java.util.List;

@Data
public class ScreenLeftTwo {
    private List<ScreenLeftTwoX> screenLeftTwoXs;
    private List<ScreenLeftTwoY> screenLeftTwoYs;
}