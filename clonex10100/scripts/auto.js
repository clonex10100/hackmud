function(context, args)
{
	//Checks if  lock is solved
	function c(){
		try{
			return !run.includes("not the correct");
		}
		catch(err){
			//out.msg += tar + " Loc failed\n";
			notSolved = false;
		}

	};
	//Runs target
	function r(){
		run =  args[tar].call(d);
	}
	//Checks specified lock with each value
	function i(lock,vals){
		for(var val = 0; val < vals.length; val++){
			d[lock] = vals[val]
			r();
			if(c()){
				//out.msg+= lock +":"+ vals[val] + ", ";
				break;
			}
		}
		return val;
	}
	///Constants
	var ez =["open","unlock","release"];
	var digits = [0,1,2,3,4,5,6,7,8,9];
	var primes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,61,67,71,73,79,83,89,97];
	var colors = ["red","purple","blue","cyan","green","lime","yellow","orange"];
	var keys = ["vc2c7q","72umy0","xwz7ja","hc3b69","4jitu5","afgny5","vzdt6m","tvfkyq"];

	var out = {msg:"Done"};
	
	//Input for target script
	var d;
	//Stores output from running target
	var run;
	var lock;
	var notSolved;
	var temp;
	var secLev;
	var lib = #fs.scripts.lib();
	//Iterate over every script given as an argument
	for(var tar in args){
		d={};
		notSolved=true; 
		//Make sure script is safe
		//secLev = #fs.scripts.get_level({name:args[tar].name})
		//if(secLev < 4){ 
	//		out.msg = "Script is sl " + lib.get_security_level_name(secLev);
		//	out.ok = false;
		//	return out;
		//}
		r();
		while(notSolved){
			try{
				temp = run.split(" ");
			}
			catch(err){
				//out.msg += tar + " loc failed \n";
				break;
			}
			lock=temp[temp.length-2].slice(2,-1);
			switch(lock){
				case "EZ_21":
					i(lock,ez);
					break;
				case "EZ_35":
					i(lock,ez);
					i("digit",digits);
					break;
				case "EZ_40":
					i(lock,ez);
					i("ez_prime",primes);
					break;
				case "c001":
					i(lock,colors);
					i("color_digit",digits);
					break;
				case "c002":
					d.c002_complement=colors[(i(lock,colors) + 4) % 8];
					//out.msg+="c002_complement:"+d.c002_complement+", ";
					r();
					break;
				case "c003":
					var ci = i(lock,colors);
					d.c003_triad_1=colors[(ci + 3) % 8];
					//out.msg+="c003_triad_1:" + d.c003_triad_1 + ", ";
					d.c003_triad_2=colors[(ci + 5) % 8];
					//out.msg+="c003_triad_2:"+d.c003_triad_2 + ", ";
					r();
					break;
				case "l0cket":
					i(lock,keys);
					break;
				default:
					//if(c()){
				//		out.msg += tar + " Success\n";
					//}
					//else{
				//		out.msg += tar + " Failed to crack lock. May not know correct l0cket key\n";
				//	}
					notSolved=false;
			}
		}
	}
	out.ok = true;
	return out;
}
