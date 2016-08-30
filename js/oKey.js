(function ($) {
     flag = true;
	$.fn.oKey = function (options, callback) {
		//jq 写法
		var _self = $(this);
		// js 写法
		var _oSelf = this;
		var obj1 = null;
		var table = null;
		var password = [];

		var defaults = {
			needHide: true,
			callBack: null
		};
		this.settings = $.extend({}, defaults, options);
		var _init = function(){
			if(flag){
				_createKey();
				flag = false;
			}
			if(_oSelf.settings.needHide){
				_hided();

			}


		}
		var _createKey = function(){
			if (_oSelf.settings.needHide) {
				obj1 = document.createElement('div');
				obj1.id = 'hide';
				obj1.innerHTML = '<img src="img/keydown.png" height="17" width="23" alt="down" class="down_xl"/>';
				_self.append(obj1);
			}

			table = document.createElement('table');
			table.style.border = 'none';
			var _arry = ['&nbsp;', 'ABC', 'DEF', 'GHI', 'JKL', 'MNO', 'PQRS', 'TUV', 'WXYZ'];
			var _html = "";
			var _tr = [];
			var _tbody = document.createElement('tbody');
			for (var j = 0; j < 13; j += 3) {
				_tr[j] = document.createElement('tr');
				if (j == 3) {

					for (var i = 0; i < j; i++) {
						_html += '<td class="key' + i + '">' + (i + 1) + '<br/><span class="zimu">' + _arry[i] + '</span></td>';
					}

					_tr[j - 3].innerHTML = _html;
					_tbody.appendChild(_tr[j - 3]);
					_html = '';

				}

				if (j == 6) {

					for (var i = j - 3; i < j; i++) {
						_html += ' <td class="key' + i + '">' + (i + 1) + '<br/><span class="zimu">' + _arry[i] + '</span></td>';
					}
					_tr[j - 3].innerHTML = _html;
					_tbody.appendChild(_tr[j - 3]);
					_html = "";

				}

				if (j == 9) {
					for (var i = j - 3; i < j; i++) {
						_html += ' <td class="key' + i + '">' + (i + 1) + '<br/><span class="zimu">' + _arry[i] + '</span></td>';
					}

					_tr[j - 3].innerHTML = _html;
					_tbody.appendChild(_tr[j - 3]);
					_html = "";
				}

				if (j == 12) {
					_html = '<td class="reset">清空</td>' + "\n" + '<td class="key10">0</td>' + "\n" + '<td class="back"><img class="back" src="img/backdel.png" height="108" width="214" alt="back"/></td>';
					_tr[j - 3].innerHTML = _html;
					_tbody.appendChild(_tr[j - 3]);
					_html = "";
				}

			}


			table.appendChild(_tbody);
			_self.append(table);

			_getPassWord();
			_del();



		}

		var _showKey = function(){
			_self.show();
			window.scrollTo(0, 10000);
		}

		var _getPassWord = function(){
			$("td").each(function (i) {
				touch.on(".key" + i, 'touchstart', function (ev) {
					$(".key" + i).css("background", "#e1e5ef");
					setTimeout(function () {
						$(".key" + i).css("background", "none");
					}, 150);
					for (var j = 0; j <= 5; j++) {
						if (password[j] == null) {
							if (i == 10) {
								password[j] = 0;
							} else {
								password[j] = i + 1;
							}
							$(".text" + (j + 1)).css("display", "block");
							if (password[5] != null) {
								$("#jypwd").val(password.join(""));
								$("#key").hide();
								//判断是否有回调函数，并执行
								_oSelf.settings.callBack&&_oSelf.settings.callBack.call( _oSelf ,password.join(""));
							}
							return false;
						}
					}

				});
			});
		}
		var _hided = function(){
			$("#hide").click(function () {
				$("#key").hide();
				window.scrollTo(0,0);
			});
		}

		var _del = function(){
			touch.on('.back', 'touchstart', function(ev){
				for (var i = 5; i >= 0; i--) {
					if (password[i] != null) {
						password[i] = null;
						$(".text" + (i + 1)).css("display", "none");
						return false;
					}
				}
			});
			$(".reset").click(function () {
				password = [];
				$(".textk").css("display", "none");
				$(".text").css("display", "none");
			});
		}

		//供外部调用
		this.showKey = function(){
			_showKey();
		}


       // 启动插件
		_init();
		//链式调用
		return this;
	};


})(jQuery);