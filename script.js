function showTab(id){
  document.querySelectorAll(".section").forEach(s=>s.classList.remove("active"))
  document.getElementById(id).classList.add("active")
}

function calcAll(){
  calcPre()
  calcClinical()
  calcCP()
}

function calcPre(){
  let h = parseFloat(height.value)||0
  let w = parseFloat(weight.value)||0
  let prime = parseFloat(prime.value)||0

  if(h && w){
    let b = Math.sqrt((h*w)/3600)
    bsa.innerText = "BSA: " + b.toFixed(2)

    let blood = w*70
    let dilution = prime/(blood+prime)*100
    document.getElementById("dilution").innerText =
      "Dilution: " + dilution.toFixed(0) + "%"
  }
}

function calcClinical(){
  let w = parseFloat(weight.value)||0
  let hb = parseFloat(hb_now.value)||0
  let ci = parseFloat(ci_now.value)||0

  if(w && hb && ci){
    let b = Math.sqrt((170*w)/3600)
    let flow = ci*b
    flowEl = document.getElementById("flow")
    flowEl.innerText = "Flow: " + flow.toFixed(2)

    let do2 = 1.34*hb*flow*10
    document.getElementById("do2").innerText =
      "DO2: " + do2.toFixed(0)
  }
}

function calcCP(){

  let cpInitEl = document.getElementById("cp_init")
  let cpContEl = document.getElementById("cp_cont")

  if(!cpInitEl || !cpContEl) return

  let w = parseFloat(weight.value)||0
  let ratio = document.getElementById("cp_ratio").checked ? 1.5 : 1

  let init = 800 * ratio
  let cont = 10 * w * ratio

  cpInitEl.value = init.toFixed(0)
  cpContEl.value = cont.toFixed(0)

  let k = 37
  let ecf = w*0.2
  let total = 0

  function calcK(val, vol, div){
    if(!val || !w) return null
    let dose = (vol/div/1000)*k
    total += dose
    return val + (dose/ecf)
  }

  let r1 = calcK(parseFloat(k1.value), init, 2)
  if(r1) kPred1.innerText = r1.toFixed(2)

  let r2 = calcK(parseFloat(k2.value), cont, 3)
  if(r2) kPred2.innerText = r2.toFixed(2)

  let r3 = calcK(parseFloat(k3.value), 600, 5)
  if(r3) kPred3.innerText = r3.toFixed(2)

  totalK.innerText = "Total K: " + total.toFixed(1)
}

window.onload = calcAll