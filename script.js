
/* 表示画面の切り替え ==========================================*/
// 初めの画面
const first_view = document.querySelector('.first_view')
// スタートボタン押した時のアナウンス
startVoice = new Audio('voice/start.mp3')
// enterボタン
const startButton = document.getElementById('enter_button')
// enterボタンをクリックしたら
startButton.addEventListener('click', () => {
	startVoice.play()
	// 初めの画面をdisplay:noneへ
	first_view.classList.add('erase')
	// main画面表示
	document.querySelector('.main').classList.add('isActive')
})

/* じゃんけん ==========================================*/

// TODO  各要素の定義　======================================================

// pcの画像　1:グー　２:チョキ　３:パー
const pcHandImgs = ["img/img1.png", "img/img2.png", "img/img3.png"]

// グー、チョキ、パー全てのボタン
const myhandBtns = document.querySelector('.myhandBtns')
// グー、チョキ、パーの各ボタン取得
const stoneBtn = document.querySelector('.stoneBtn'),
	paperBtn = document.querySelector('.paperBtn'),
	scissorBtn = document.querySelector('.scissorBtn')

// 各声の初期化
const stoneVoice = new Audio('voice/stone.mp3'),
	scissorVoice = new Audio('voice/scissor.mp3'),
	paperVoice = new Audio('voice/paper.mp3'),
	winVoice = new Audio('voice/winVoice.mp3'),
	loseVoice = new Audio('voice/loseVoice.mp3'),
	resetVoice = new Audio('voice/reset.mp3')
// 勝敗をアナウンスする関数
function judgeVoice(voice) {
	voice.play()
}

//星を出すスペース
const myAddStarWrap = document.querySelector('.myAddStarWrap'),
	pcAddStarWrap = document.querySelector('.pcAddStarWrap')
//星のカウント
let addMyStarCounter = 0,
	addPcStarCounter = 0

//勝敗結果を表示するスペース
const winResult = document.getElementById('winResult'),
	loseResult = document.getElementById('loseResult')

// 勝敗のカウント
let winCounter = 0,
	loseCounter = 0

// 1回のじゃんけんの勝敗を表示する要素
const judge = document.querySelector('.judge')

// 勝敗を表示する要素
const myResult = document.getElementById('myResult')

// TODO  じゃんけんする関数 ====================================================================

// 引数（１:プレイヤーの画像番号　２:あいこになるpcの番号　3:プレイヤーが勝つpcの番号）
function myhandChoice(imgNum, aikoNum, winNum) {
	// 敵の番号を1~3よりランダムで出す(+1)する
	const pcNum = Math.floor(Math.random() * 3) + 1
	// プレイヤーのじゃんけん画像を入れる
	myHandImg.setAttribute('src', `img/img${imgNum}.png`)
	// pcのじゃんけん画像を入れる
	pcHandImg.setAttribute('src', `img/img${pcNum}.png`)
	// もしあいこだった場合
	if (pcNum === aikoNum) {
		judge.textContent = 'あいこ'
		// もし勝った場合
	} else if (pcNum === winNum) {
		judge.textContent = '勝ち'
		myAddStar()
		// もし負けた場合
	} else {
		judge.textContent = '負け'
		pcAddStar()
	}
}

// TODO 各じゃんけんボタンを押した時の処理  =================================================

// グーのボタン押す
stoneBtn.addEventListener('click', () => {
	setTimeout(() => {
		// グーの声
		stoneVoice.play()
		setTimeout(() => {
			// ボタン選んだ時の挙動
			// 引数（１:プレイヤーの画像番号　２:あいこになるpcの番号　3:プレイヤーが勝つpcの番号）
			myhandChoice(1, 1, 2)
			// 1回のジャンケンごとの勝敗判定
			victoryOrDefeat()
		}, 1000)
	},)
})
// チョキのボタン押す
paperBtn.addEventListener('click', () => {
	setTimeout(() => {
		scissorVoice.play()
		setTimeout(() => {
			myhandChoice(2, 2, 3)
			victoryOrDefeat()
		}, 1000)
	},)
})
// パーのボタン押す
scissorBtn.addEventListener('click', () => {
	setTimeout(() => {
		paperVoice.play()
		setTimeout(() => {
			myhandChoice(3, 3, 1)
			victoryOrDefeat()
		}, 1000)
	})
})

// TODO  星に関する内容　===================================================

// プレイヤーの星を増やす関数
function myAddStar() {
	// imgタグ生成
	const starImg = document.createElement('img')
	// imgタグに星の画像表示
	starImg.setAttribute('src', 'img/star.png')
	// 親要素に差し込み
	myAddStarWrap.appendChild(starImg)
	// 星の数を１増やす
	addMyStarCounter++
}
// pcの星を増やす関数
function pcAddStar() {
	const starImg = document.createElement('img')
	starImg.setAttribute('src', 'img/star.png')
	pcAddStarWrap.appendChild(starImg)
	addPcStarCounter++
}

// TODO  勝敗を判定する関数==================================================================

function victoryOrDefeat() {
	// プレイヤーの結果を表示する場所
	const myResult = document.getElementById('myResult')
	// 3勝したら
	if (addMyStarCounter >= 3) {
		// ボタン押せない
		myhandBtns.style.pointerEvents = 'none'
		// 勝ちのカウンター
		winCounter++
		// ローカルストレージに勝ち回数保存
		localStorage.setItem('winRecord', JSON.parse(winCounter))
		// 1秒後勝ちのアナウンス。2秒後に結果表示(その間は触れない)
		
		// new Promise((resolve) => {
		// 	setTimeout(() => {
		// 		judgeVoice(winVoice);
		// 		resolve();
		// 	}, 1000)
		// }).then(() => {
		// 	// resovleしたら下記のthenメソッド実行
		// 	resetResult()
		// })
		// セットタイムアウトでも可能
		setTimeout(() => {
			judgeVoice(winVoice);
			setTimeout(() => {
				resetResult()
			}, 2000)
		}, 1000)
	}

	// 3敗したら
	if (addPcStarCounter >= 3) {
		myhandBtns.style.pointerEvents = 'none'
		// 負けのカウンター
		loseCounter++
		// ローカルストレージに負け回数保存
		localStorage.setItem('loseRecord', JSON.parse(loseCounter))
		// 1秒後負けのアナウンス。2秒後に結果表示(その間は触れない)
		setTimeout(() => {
			judgeVoice(loseVoice);
			setTimeout(() => {
				resetResult()
			}, 2000)
		}, 500)
	}
}

// TODO リセットする関数  ====================================================================

// 結果などをリセットする関数
function resetResult() {
	myHandImg.setAttribute('src', '')
	pcHandImg.setAttribute('src', '')
	myAddStarWrap.innerHTML = ''
	pcAddStarWrap.innerHTML = ''
	judge.textContent = ''
	myResult.textContent = `結果：${winCounter}勝${loseCounter}敗`
	addMyStarCounter = 0
	addPcStarCounter = 0
	// ボタンを押せるようにする
	myhandBtns.style.pointerEvents = 'auto'
}

// リセットボタン押した時の挙動
const resetBtn = document.getElementById('resetBtn')
resetBtn.addEventListener('click', () => {
	resetResult()
	myResult.textContent = `結果：${' '}勝${' '}敗`
	resetVoice.play()
})

/* ルール表示(モーダルを開く) ==========================================*/

const ruleBotton = document.getElementById('rule'),
			ruleBook = document.getElementById('ruleBook'),
			modalCloseButton = document.getElementById('modalCloseButton'),
			mask = document.getElementById('mask')

ruleBotton.addEventListener('click', () => {
	ruleBook.classList.add('show')
	mask.classList.add('show')
})

modalCloseButton.addEventListener('click', () => {
	ruleBook.classList.remove('show')
	mask.classList.remove('show')
})

/* gsapアニメーション ==========================================*/
// 初めの画面の画像
const firstViewImg = document.querySelector('.first_view_img')

// gsapの処理（set）
gsap.set(firstViewImg, {
	opacity: 0,
})
gsap.set(startButton, {
	y: '100px',
	scale: 0.5
})
// gsapの処理（timeline）
const tl = gsap.timeline()
tl.to(firstViewImg, 1, {
	opacity: 1,
	rotation: 360,
	y: 0,
	delay: 0.3
})
	.to(startButton, 1, {
		y: '0',
		scale: 1,
		ease: 'power2.in'
	}, .2)