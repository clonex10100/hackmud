function(context, args)
{
	var run;
	var solved = false;
	if(!args.o){
		var ob = {};
	}
	else{
		ob = args.o;
	}
	var ret;
	var lock;
	var msg = "";
	var acc = []
	var a = false;
	var ac;
	run = args.t.call(ob);

	while(!solved){
		if(run.includes("Connection terminated")){
			return {ok:true,o:ob,m:msg,acc:acc}
		}
		lock = run.split(" ");
		lock = lock[lock.length -2].slice(2,-1);

		switch(lock){
			case "magnara":
				ret = #fs.clonex10100.magnara({t:args.t,o:ob})
				if(!ret.ok){
					return ret;
				}
				run = ret.run;
				ob = ret.o;
				break;
			case "CON_SPEC":
				ret = #fs.clonex10100.con({t:args.t,o:ob})
				if(!ret.ok){
					return ret;
				}
				run = ret.run;
				ob = ret.o;
				break;
			case "acct_nt":
				ret = #hs.clonex10100.acct({t:args.t,o:ob})
				if(!ret.ok){
					return ret;
				}
				ac = ret.msg;
				run = ret.run;
				ob = ret.o;
				a = true;
				break;
				acc.push(ret);
			case "sn_w_glock":
				ret = #ms.dang19.glock({t:args.t,o:ob,a:a})
				if(!ret.ok){
					return ret;
				}
				run = ret.run;
				ob = ret.o;
				if(a){
					ret = #hs.clonex10100.acct({t:args.t,o:ob})
					if(!ret.ok){
						return ret;
					}
					a = false;
					msg = "did the thing"
				}
				run = ret.run;
				ob = ret.o;
				break;
			default:
				return {ok:false,m:"can't find lock",lock:lock,r:run,ob:ob,msg:msg,a:ac,acc:acc};
		}
	}
}

