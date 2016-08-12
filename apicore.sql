/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50623
Source Host           : 127.0.0.1:3306
Source Database       : apicore

Target Server Type    : MYSQL
Target Server Version : 50623
File Encoding         : 65001

Date: 2016-08-11 13:43:43
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(255) DEFAULT NULL COMMENT '名字',
  `AddTime` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '添加时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES ('1', '1', '2016-08-10 21:36:03');
INSERT INTO `test` VALUES ('2', 'fff1', '2016-08-10 21:36:34');

-- ----------------------------
-- Procedure structure for AddTest
-- ----------------------------
DROP PROCEDURE IF EXISTS `AddTest`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `AddTest`(`i_name` varchar(50))
    SQL SECURITY INVOKER
    COMMENT '添加测试数据'
BEGIN
	#Routine body goes here...
	INSERT test(NAME) VALUES(i_name);
	SELECT 0 as 'InfoCode','添加成功' as 'InfoMsg';
END
;;
DELIMITER ;

-- ----------------------------
-- Procedure structure for GetTestList
-- ----------------------------
DROP PROCEDURE IF EXISTS `GetTestList`;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetTestList`()
    SQL SECURITY INVOKER
    COMMENT '获取测试数据列表'
BEGIN
	#Routine body goes here...
	SELECT id,name,addtime from test where 1=1;
END
;;
DELIMITER ;
