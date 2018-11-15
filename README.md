# RNToast

RNToast 功能类似于native-base的Toast，但是不同的是RNToast除了支持提示文字以外，还增加了图片的支持(android)。

# 效果图

![android_default](https://github.com/china-english/RNToast/tree/master/assets/Android1.jpg)
![android_image](https://github.com/china-english/RNToast/tree/master/assets/Android2.jpg)
![ios_default](https://github.com/china-english/RNToast/tree/master/assets/iPhoneX1.jpg)
![ios_image](https://github.com/china-english/RNToast/tree/master/assets/iPhoneX2.jpg)

## 如何使用

`npm i rntoast --save`

## 例子

```
import Toast from 'rntoast'

...
// other code
...

Toast.show({
            content: 'text', //也可以是一个自定义的组件
            duration: 2000,
            shadow: true,
            animation: false,
            hideOnPress: false,
            delayShow: 0,
            type: "info",
            confirm: true
          })
```

### 可用参数
| Name | Type| Default | Description |
| --- | --- | --- | --- |
| animation | bool | true | 组件显示/隐藏时是否有动态效果 |
| confirm | bool | false | 是否显示Toast隐藏按钮 |
| confirmText | string | 'ok' | Toast按钮的文字内容 |
| containerStyle | style |  | 显示内容的整体样式 |
| duration | number | 3000 | Toast的持续时间 |
| position | number |  | 正数距离顶部距离，负数距离底部距离， 0居中 |
| opacity | number | 1 | Toast的透明度 |
| textStyle | style |  | 传入Toast中的内容为string时有效 |
| delayShow | number | 0 | 点击后延迟多久显示Toast |
| hideOnPress | bool | true | 点击Toast是否关闭Toast |
| type | string | default | 支持success(#5cb85c)/info(#62B1F6)/error(#d9534f)/warning(#f0ad4e)/default(#999999) |


### 可调用函数

| Name | Type| Default | Description |
| --- | --- | --- | --- |
| onHide | func |  | Toast关闭前调用 |
| onHidden | func |  | Toast关闭成功时调用 |
| onShow | func |  | Toast打开前调用 |
| onShown | func |  | Toast打开成功时调用 |



## MIT Licensed
