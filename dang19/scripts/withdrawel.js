function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	if(context.caller === "clonex10100"){
		if(args.m === "w"){
			#ms.accts.xfer_gc_to_caller({amount:args.t})
		}
		else if(args.m === "d"){
			#ms.accts.xfer_gc_to({to:"dang19",amount:args.t});
		}
	}
	return { ok:true };
}
