function(context, args)
{
	var caller = context.caller;
	var l = #fs.scripts.lib();
	#db.u({id:"4lw"},{$set:{cipt:"pict"}})
	var db = #db.f({id:"4lw"}).first()
	return {ok:true,ob:db["cipt"]}
}
