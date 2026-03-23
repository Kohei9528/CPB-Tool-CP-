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
let h=+height.value||0
let w=+weight.value||0
let hb=+hb.value||0
let alb=+alb.value||0
let prime=+prime.value||0

if(h&&w){
let b=Math.sqrt((h*w)/3600)
bsa.innerText="BSA: "+b.toFixed(2)

let blood=w*70

if(hb) hbDil.innerText="Hb: "+(hb*blood/(blood+prime)).toFixed(2)
if(alb) albDil.innerText="Alb: "+(alb*blood/(blood+prime)).toFixed(2)

let units=+transfusion_u.value||0
let transfusion=units*200

let d=(prime-transfusion)/(blood+prime+transfusion)*100
if(d<0)d=0
dilution.innerText="Dilution: "+d.toFixed(0)+"%"
}
}

function calcClinical(){
let h=+height.value||0
let w=+weight.value||0
let hbv=+hb_now.value||0
let ci=+ci_now.value||0
let sbe=+target_sbe.value||0
let targetHb=+target_hb.value||0

if(h&&w&&hbv&&ci){
let b=Math.sqrt((h*w)/3600)
let flow=ci*b
flowEl.innerText="Flow: "+flow.toFixed(2)

let do2=1.34*hbv*flow*10
let do2i=do2/b

let color="green"
if(do2<280) color="red"
else if(do2<330) color="orange"

do2El.innerHTML="<span style='color:"+color+"'>DO2: "+do2.toFixed(0)+"</span>"
do2iEl.innerText="DO2i: "+do2i.toFixed(0)

let blood=w*70
let total=blood+500

let r=(targetHb-hbv)*total/200
if(r<0)r=0
rbc.innerText="RBC: "+r.toFixed(1)

let m=0.36*w*(0-sbe)
if(m<0)m=0
meylon.innerText="Meylon: "+m.toFixed(0)
}
}

function calcCP(){

let cpInitEl=document.getElementById("cp_init")
let cpContEl=document.getElementById("cp_cont")
if(!cpInitEl||!cpContEl) return

let w=+weight.value||0
let ratio=cp_ratio.checked?1.5:1

let init=800*ratio
let cont=10*w*ratio

cpInitEl.value=init.toFixed(0)
cpContEl.value=cont.toFixed(0)

let ecf=w*0.2
let k=37
let total=0

function calcK(val,vol,div){
if(!val||!w)return null
let dose=(vol/div/1000)*k
total+=dose
return val+(dose/ecf)
}

let r1=calcK(+k1.value,init,2)
if(r1) kPred1.innerText=r1.toFixed(2)

let r2=calcK(+k2.value,cont,3)
if(r2) kPred2.innerText=r2.toFixed(2)

let r3=calcK(+k3.value,600,5)
if(r3) kPred3.innerText=r3.toFixed(2)

totalK.innerText="Total K: "+total.toFixed(1)
}

window.onload=calcAll