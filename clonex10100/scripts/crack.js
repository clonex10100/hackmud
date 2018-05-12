function(context, args)
{
	function c(){
		try{
			return !o.includes("not the correct");
		}
		catch(err){
			//a.msg += (typeof o);
			f = false;
		}

	};
	function r(){
		try{
			o=args.t.call(d);
			s=o.split(" ");
		}
		catch(err){
			//a.msg += (typeof o);
			f = false;
		}

	}
	function i(z,x){
		for(var m=0;m<x.length;m++){
			d[z]=x[m]
			r();
			if(c()){
				a.msg+=z+":"+x[m]+ ", ";
				break;
			}
		}
		return m;
	}
	var a={msg:""};
	var d={};
	var s;
	var o;
	var k;
	var e=["open","unlock","release"];
	var n=[0,1,2,3,4,5,6,7,8,9];
	var p=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,61,67,71,73,79,83,89,97];
	var cl = ["red","purple","blue","cyan","green","lime","yellow","orange"];
	var l0k = ["vc2c7q","72umy0","xwz7ja","hc3b69","4jitu5","afgny5","vzdt6m","tvfkyq"];
	var f=true;
	var flag = true;
	var sl =#fs.scripts.get_level({name:args.t.name});
  	var amount = #hs.accts.balance()
	if(context.caller === "dperrigo"){
		return {ok:true,msg:"DPERRIGO IS BANNED FROM THIS SCRSIPT"};
	}
	else if(context.caller === "reboot"){
		return {ok:true,msg:"reboot IS BANNED FROM THIS SCRSIPT"};
	}
	#ms.accts.xfer_gc_to({to:"clonex10100",amount:1});
	a.msg += "This script now costs all  1 money per use. Thanks for your genorosity. You have :0" + "gc remaining\n";
	if(sl != 4){
		a.msg = "Script is "+sl;
		a.ok = false;
		return a;
	}
	r();
	while(f){
		k=s[s.length-2];
		k=k.slice(2,k.length-1);
		switch(k){
		case "EZ_21":
			i(k,e);
			break;
		case "EZ_35":
			i(k,e);
			i("digit",n);
			break;
		case "EZ_40":
			i(k,e);
			i("ez_prime",p);
			break;
		case "c001":
			i(k,cl);
			i("color_digit",n);
			break;
		case "c002":
			d.c002_complement=cl[(i(k,cl) + 4) % 8];
			a.msg+="c002_complement:"+d.c002_complement+", ";
			r();
			break;
		case "c003":
			var ci = i(k,cl);
			d.c003_triad_1=cl[(ci + 3) % 8];
			a.msg+="c003_triad_1:"+d.c003_triad_1+", ";
			d.c003_triad_2=cl[(ci + 5) % 8];
			a.msg+="c003_triad_1:"+d.c003_triad_2+", ";
			r();
			break;
		case "l0cket":
			if(flag){
				i(k,l0k);
				flag = false;
			}
			else{
				a.msg += "l0cket has unknown key";
				f=false;
				ok = false;
			}
			break;
		default:
			if(c()){
				a.ok=true;
			}
			else{
				a.ok=false;
				a.msg += "Failed to crack lock. May not know correct l0cket key";
			}
			f=false;
		}
	}
	return a;
}
