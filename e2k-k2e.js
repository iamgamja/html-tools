// 이 파일은 qwerty 기준 한영타 및 영한타 번역기를 js로 구현한 파일입니다.
// 한영타 변환: gksdud(string)
// 영한타 변환: dudgks(string)

		var 배코 = 44032
		var 초코 = 588
		var 중코 = 28
		var 종코 = 1
		var 맥코 = 55203
		var 초성 = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
		var 중성 = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ']
		var 종성 = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ']
		var 한글 = ['ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ', 'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ', '']
		var 영어 = ['r', 'R', 'rt', 's', 'sw', 'sg', 'e', 'E', 'f', 'fr', 'fa', 'fq', 'ft', 'fx', 'fv', 'fg', 'a', 'q', 'Q', 'qt', 't', 'T', 'd', 'w', 'W', 'c', 'z', 'x', 'v', 'g', 'k', 'o', 'i', 'O', 'j', 'p', 'u', 'P', 'h', 'hk', 'ho', 'hl', 'y', 'n', 'nj', 'np', 'nl', 'b', 'm', 'ml', 'l', '']
		var 한영 = {}
		var 영한 = {}
		for (i=0; i<52; i++) {
			한영[한글[i]] = 영어[i]
			영한[영어[i]] = 한글[i]
		}
		var 겹글 = "rsfqhnm"

		function gksdud(m) {
			m+='.'
			f = ''
			for (i of m){
				c = i.charCodeAt(0)
				if (배코<=c && c<=맥코) {
					c%=배코 ; f+=한영[초성[parseInt(c/초코)]]
					c%=초코 ; f+=한영[중성[parseInt(c/중코)]]
					c%=중코 ; f+=한영[종성[parseInt(c/종코)]]
				} else {
					if (i in 한영) {
						f += 한영[i]
					} else {
						f += i
					}
				}
			}
			return f.slice(0, -1)
		}

		function dudgks(m) {
			m+='.'
			f=''
			w=''
			임시 = "NaN"
			//한글로 바꾸기
			for (i in m) {
				i = Number(i)
				if (겹글.indexOf(m[i]) != -1 && m.length>=i+2 && 임시 == "NaN") {
					임시 = m[i]
				} else if (임시+m[i] in 영한) {
					임시 += m[i]
				} else if (임시.length == 2 && 중성.indexOf(영한[m[i]]) != -1) {
					w+=영한[임시[0]]
					w+=영한[임시[1]]
					w+=영한[m[i]]
					임시 = "NaN"
				} else if (임시 != "NaN") {
					w+=영한[임시] ; 임시 = "NaN"
					if (겹글.indexOf(m[i]) != -1 && m.length>=i+2 && 임시 == "NaN") {
						임시 = m[i]
					} else {
						w+= (m[i] in 영한) ? 영한[m[i]] : m[i]
					}
				} else {
					w+= (m[i] in 영한) ? 영한[m[i]] : m[i]
				}
				// console.log(i, m[i], 임시, w)
			}
			//한글을 합치기
			temp = []
			for (i of w) {
			    temp.push(i)
			}
			w=temp

			임시 = []
			for (i in w) {
				i = Number(i)
				if (임시.length == 0) {
					if (초성.indexOf(w[i]) != -1) {
						임시.push(w[i])
					} else {
						f+=w[i]
					}
				} else if (임시.length == 1) {
					if (중성.indexOf(w[i]) != -1) {
						임시.push(w[i])
					} else {
						f+=임시[0]
						임시 = 임시.splice(1, 임시.length)
						if (초성.indexOf(w[i]) != -1) {
							임시.push(w[i])
						} else {
							f+=w[i]
						}
					}
				} else {
					if (종성.indexOf(w[i]) != -1) {
						if (초성.indexOf(w[i]) != -1 && (w.length>=i+2 ? 중성.indexOf(w[i+1]) != -1 : false)) {
							f += String.fromCharCode(String(배코+초성.indexOf(임시[0])*초코+중성.indexOf(임시[1])*중코), 10)[0]
							임시 = 임시.splice(2, 임시.length)
							임시.push(w[i])
						} else {
							f += String.fromCharCode(String(배코 + 초성.indexOf(임시[0])*초코 + 중성.indexOf(임시[1])*중코 + 종성.indexOf(w[i])), 10)[0]
							임시 = 임시.splice(2, 임시.length)
						}
					} else {
						f += String.fromCharCode(String(배코 + 초성.indexOf(임시[0])*초코 + 중성.indexOf(임시[1])*중코), 10)[0]
						임시 = 임시.splice(2, 임시.length)
						if (초성.indexOf(w[i]) != -1) {
							임시.push(w[i])
						} else {
							f+=w[i]
						}
					}
				}
			}
			for (i of 임시) {
				f+=i
			}
			return f.slice(0, -1)
		}
