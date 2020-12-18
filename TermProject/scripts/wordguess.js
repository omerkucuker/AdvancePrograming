		//let url = "https://omerkucuker.github.io/AdvancePrograming/TermProject/data/words_more.txt";
		let url = "https://raw.githubusercontent.com/calcioo/random-wordlist-tr/master/trlist-orig.txt"

		let wordsLine;
		let wordMap = new Map();
		let wordArray = [];
		let kalanHak;
		let puan;
		let tanim;
		let kelime;
		class Words {
			constructor(name, defin) {
				this.name = name;
				this.defin = defin;

			}
			toString() {
				return this.name + " " + this.defin;
			}
		}

		function ReadWords(url) {

			fetch(url).then(r => r.text(), AddWords).then(AddWords);
		}
		function AddWords(txt) {

			wordsLine = txt.split("\n");
			wordsLine.shift();

		/*	for (let i = 0; i < wordsLine.length - 1; i++) {
				//console.log(wordsLine[i]);
				//console.log(wordsLine[i+1]);
				let c = new Words();
				if (!wordsLine[i].includes("*") && !wordsLine[i].includes(" ")) { //birden fazla kelimeden oluşan kelimeleri elemek için

					c.name = wordsLine[i];
					c.defin = wordsLine[i + 1].slice(2,); //* ve boşluğu atmak için
				} else {
					continue;
				}

				wordMap.set(c.name, c.defin);
			}
			wordArray = Array.from(wordMap); */
			//console.log(wordArray);

		}
		async function RandomWord() {
			kalanHak = 3;
			/* let randomNumber = Math.floor(Math.random() * wordArray.length);
			//console.log(randomNumber);
			tanim = wordArray[randomNumber][1];
			kelime = wordArray[randomNumber][0];
			kelime = kelime.slice(0, kelime.length - 1);//kelimenin sonundaki boşluğu sildik */
			
			let randomNumber = Math.floor(Math.random() * wordsLine.length);
			kelime = wordsLine[randomNumber];
			console.log(kelime);
			let url ="https://sozluk.gov.tr/gts?ara="+kelime;
			//console.log(url);
			//let pro = fetch(url).then(response => response.json()).then(result => result[0]).then(data =>data["anlamlarListe"]).then(data => data[0]).then(data => data["anlam"]);
			let pro = fetch(url).then(response => response.json()).then(result => result[0]["anlamlarListe"][0]["anlam"]);
			let tanim= await pro;			
			console.log(tanim);	
			
			tanimlbl.innerText = tanim;
			tanimlbl.style = "font-size: 20px;";

			let ranWordNumb = Math.floor(Math.random() * ((kelime.length) - 1));
			//console.log(ranWordNumb);
			let inText = "";
			for (let i = 0; i < kelime.length; i++) {
				if (i == ranWordNumb && kelime[i] === " ") {					
					inText += kelime[Math.floor(Math.random() * ((kelime.length) - 1))];
				}
				else if(i == ranWordNumb){
					inText += kelime[ranWordNumb];
				}
				else if(kelime[i] == ' '){
					inText += " , ";
				}
				else {
					inText += "-";
				}
			}
			if (kelime.length >= 6) {
				var x = inText.search("-");
				//console.log(x);
				inText = inText.replaceAt(x, kelime[x]);

			}
			inText += "."
			kelimelbl.innerText = inText.split('').join('  ');
			document.getElementById("harfbtn").style.pointerEvents = "fill";
			document.getElementById("tahminbtn").style.pointerEvents = "fill";
			
			kalanhak.innerText = " " + kalanHak;
			puanlbl.innerText = " ";
			sonuc.innerText = " ";
			document.getElementById("taniminp").value="";
		}
		function prediction(taniminp) {

			if (kalanHak != 0) {
				var deger = kelime.localeCompare(document.getElementById("taniminp").value);

				if (deger == 0) {
					sonuc.innerText = " Tebrikler Bildiniz :)";
					var sound = document.getElementById("audio");
					sound.play();
					let kalantire = kelimelbl.innerText.split("-").length - 1;
					puan = ((kalanHak - 1) * 150) + (kalantire * 100);
					puanlbl.innerText = " " + puan;
					document.getElementById("harfbtn").style.pointerEvents = "none";
					kalanHak += -1
					kalanhak.innerText = " " + kalanHak;

				} else if (deger != 0 && kalanHak == 1) {
					sonuc.innerText = "Son Hakkında Da Bilemedin. Yeni Oyun Butonuna Basarak Yeni Oyun Başlatabilirsiniz. Doğru Kelime: " + kelime;
					puanlbl.innerText = " 0";
					kalanHak += -1
					kalanhak.innerText = " " + kalanHak;
					var sound = document.getElementById("audiotwo");
					sound.play();
					document.getElementById("harfbtn").style.pointerEvents = "none";
					document.getElementById("tahminbtn").style.pointerEvents = "none";
					
				}
				else {
					sonuc.innerText = " Malesef Bilemediniz. Büyük-Küçük Harfe Dikkat Edip Tekrar Deneyin !";
					kalanHak += -1
					kalanhak.innerText = " " + kalanHak;
				}
			} else {
				sonuc.innerText = " Hakkınız Bitti Yeni Oyun Butonuna Basarak Yeni Oyun Başlatabilirsiniz.Doğru Kelime: " + kelime;
				puanlbl.innerText = " 0";
				var sound = document.getElementById("audiotwo");
				sound.play();
				document.getElementById("harfbtn").style.pointerEvents = "none";
				document.getElementById("tahminbtn").style.pointerEvents = "none";
			}

		}

		String.prototype.replaceAt = function (index, replacement) {
			return this.substr(0, index) + replacement + this.substr(index + replacement.length);
		}
		function harfGetir() {
			if (kalanHak != 0) {
				//console.log(kelimelbl.innerText.replace(/\s/g, ''));
				let ranWordNumb = Math.floor(Math.random() * ((kelime.length)));
				//console.log(ranWordNumb);
				let inText = kelimelbl.innerText.replace(/\s/g, '');
				//
				//console.log(inText);
				if (inText[ranWordNumb] == "-") {
					inText = inText.replaceAt(ranWordNumb, kelime[ranWordNumb]);
				}
				else if (inText.search("-") == -1) {
					sonuc.innerText = " tüm harfler getirildi.";
					document.getElementById("harfbtn").style.pointerEvents = "none";
					puanlbl.innerText = " 0";

				}
				else {
					var x = inText.search("-");
					//console.log(x);
					inText = inText.replaceAt(x, kelime[x]);
				}

				kalanHak += -1
				kalanhak.innerText = " " + kalanHak;
				kelimelbl.innerText = inText.split('').join('  ');
			}
			else {
				sonuc.innerText = " Hakkınız Bitti Yeni Oyun Butonuna Basarak Yeni Oyun Başlatabilirsiniz.Doğru Kelime: " + kelime;
				puanlbl.innerText = " 0";
				var sound = document.getElementById("audiotwo");
				sound.play();
				document.getElementById("harfbtn").style.pointerEvents = "none";
				document.getElementById("tahminbtn").style.pointerEvents = "none";
			}

		}


		function hakkinda() {
			var kurallarWindow = window.open("", "Oyun Kuralları", "toolbar=yes,scrollbars=yes,resizable=yes,top=200,left=70,width=400,height=400");
			//kurallarWindow.windowName ="Oyun Kuralları";
			kurallarWindow.document.write(
				"<p>•	Yeni kelime butonuna basıldığında rastgele bir kelime seçilir ve altı harften küçükse bir tane harf,  büyük veya eşitse iki harfi rastgele gösterilir. Kelimenin anlamı kelimenin tanımında gösterilir. Kalan hak sıfırlanır.</p><p>•	Harf getir butonuna her basıldığında açılmayan harflerden rastgele bir tanesi açılır.</p><p>•	Tahmin edilen kelime text alanına girilip Tahmin Et butonuna basılır, Sonuç kısmının yanında sonuç gözükür.</p><p> •	Oyuncunun 3 defa tahmin etme hakkı vardır.</p><p>•	Puanlama; (Gözükmeyen harf sayısı x 100)+ (Kalan Hak x 150)</p>");

		}

		ReadWords(url);
