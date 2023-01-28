
/* 表示画面の切り替え ==========================================*/

// 初めの画面
const first_view = document.querySelector('.first_view')
// enterボタン
const enterButton = document.getElementById('enter_button')
// enterボタンをクリックしたら
enterButton.addEventListener('click', () => {
	// 初めの画面をdisplay:noneへ
	first_view.classList.add('erase')
	// main画面表示
	document.querySelector('.main').classList.add('isActive')
})

/* じゃんけん ==========================================*/

// pcの画像　1:グー　２:チョキ　３:パー
const pcHandImgs = ["img/img1.png","img/img2.png","img/img3.png"]

// グー、チョキ、パーの各ボタン取得
const stoneBtn = document.querySelector('.stoneBtn'),
	paperBtn = document.querySelector('.paperBtn'),
	scissorBtn = document.querySelector('.scissorBtn')

//勝敗結果を表示する場所 
const winResult =	document.getElementById('winResult')
const loseResult =	document.getElementById('loseResult')
// 勝敗のカウント初期値０
let winCounter = 0;
let loseCounter = 0;

const myhandBtns = document.querySelector('.myhandBtns')


	// じゃんけんする関数
	// 引数（１:プレイヤーの写真番号　２:あいこになるpcの番号　3:プレイヤーが勝つpcの番号）
	function myhandChoice(imgNum, aikoNum, winNum) {
		
		// 敵の番号を1~3よりランダムで出す(+1)する
		const pcNum =  Math.floor(Math.random() * 3) +1
		// プレイヤーのじゃんけん画像を入れる
		myHandImg.setAttribute('src', `img/img${imgNum}.png`)
		// pcのじゃんけん画像を入れる
		pcHandImg.setAttribute('src', `img/img${pcNum}.png`)
		// 勝敗を表示する要素
		const judge = document.querySelector('.judge')
    // もしあいこだった場合
		if(pcNum === aikoNum) {
			judge.textContent = 'あいこ'
		// もし勝った場合
		} else if (pcNum === winNum){
			judge.textContent = '勝ち'
			winCounter++
			winResult.textContent = `${winCounter}勝`
		// もし負けた場合
		} else {
			judge.textContent = '負け'
			loseCounter++
			loseResult.textContent = `${loseCounter}敗`
		}
	}
// const myHandImg = document.getElementById('myHandImg')
	// グーのボタン押す
	stoneBtn.addEventListener('click', () => {
		myhandChoice(1, 1, 2)
		victoryOrDefeat()
	})
	// チョキのボタン押す
	paperBtn.addEventListener('click', () => {
		myhandChoice(2, 2, 3)
		victoryOrDefeat()
	})
	// パーのボタン押す
	scissorBtn.addEventListener('click', () => {
		myhandChoice(3, 3, 1)
		victoryOrDefeat()
	})

	// 勝敗を判定する関数
	function victoryOrDefeat() {
		// プレイヤーの結果を表示する場所
		const yourResult = document.getElementById('yourResult')
		// 3勝したら
		if (winCounter >= 3) {
			yourResult.textContent = 'あなたの勝ち'
			myhandBtns.style.pointerEvents = 'none'
			// 結果をリセット　※1
			setTimeout(resetResult, 1000)
			
		}
		// 3敗したら
		if (loseCounter >= 3) {
			// ※1
			yourResult.textContent = 'あなたの負け'
			myhandBtns.style.pointerEvents = 'none'
			setTimeout(resetResult, 1000)
		}
	}

	const judge = document.querySelector('.judge')
	// 結果などをリセットする関数
	function resetResult() {
		myHandImg.setAttribute('src', '')
		pcHandImg.setAttribute('src', '')
		judge.textContent = ''
		winResult.textContent = '0勝'
		loseResult.textContent = '0敗'
		winCounter = 0
		loseCounter = 0
		yourResult.textContent = ''
		// ボタンを押せるようにする
		myhandBtns.style.pointerEvents = 'auto'
	}
	
/* gsapアニメーション ==========================================*/
// 初めの画面の画像
const firstViewImg = document.querySelector('.first_view_img')

// gsapの処理（set）
gsap.set(firstViewImg, {
	opacity: 0,
})
gsap.set(enterButton, {
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
.to(enterButton, 1, {
	y: '0',
	scale: 1,
	ease: 'power2.in'
}, .2)


// paperBtn.addEventListener('click', () => {
	// 	const pcNum =  Math.floor(Math.random() * 3) +1
	// 	const	stoneImg = document.createElement('img')
	// 	myHand.appendChild(stoneImg)
	// 	stoneImg.setAttribute('src', 'img/img2.png')
	// 	stoneImg.setAttribute('id', '1')
	// 	pcImg.setAttribute('src', `img/img${index}.png`)
		
	// if( index === 1) {
	// 	console.log('負け')
	// } else if (index === 2){
	// 	console.log('あいこ')
	// } else {
	// 	console.log('勝ち')
	// }
	// })




