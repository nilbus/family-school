

   	// livechat by www.mylivechat.com/

   	


   	MyLiveChat.Version=3006;
   	MyLiveChat.FirstRequestTimeout=10800;
   	MyLiveChat.NextRequestTimeout=21600;
   	MyLiveChat.SyncType="VISIT";
   	MyLiveChat.SyncStatus="READY";
   	MyLiveChat.SyncUserName="Guest_a435edcb";
   	MyLiveChat.SyncResult=null;
   	MyLiveChat.HasReadyAgents=false;
   	MyLiveChat.SourceUrl="https://thefamilyschoolonline.org/";
   	MyLiveChat.AgentTimeZone=parseInt("-5" || "-5");
   	MyLiveChat.VisitorStatus="VISIT";
   	MyLiveChat.UrlBase="https://a1.mylivechat.com/livechat2/";
   	MyLiveChat.SiteUrl="https://a1.mylivechat.com/";

   	
	
   	MyLiveChat.Departments=[];

   	MyLiveChat.Departments.push({
   		Name:"Default",
   		Agents:[{
   			Id:'User:1',
   			Name:"Elizabeth",
   			Online:false
   			},{
   			Id:'User:12',
   			Name:"Peter",
   			Online:false
   			}],
   		Online:false
   		});

   	MyLiveChat.Departments.push({
   		Name:"Potential Member Support",
   		Agents:[{
   			Id:'User:1',
   			Name:"Elizabeth",
   			Online:false
   			},{
   			Id:'User:12',
   			Name:"Peter",
   			Online:false
   			}],
   		Online:false
   		});

   	MyLiveChat.Departments.push({
   		Name:"Existing Member Support",
   		Agents:[{
   			Id:'User:1',
   			Name:"Elizabeth",
   			Online:false
   			},{
   			Id:'User:12',
   			Name:"Peter",
   			Online:false
   			}],
   		Online:false
   		});


	
   	MyLiveChat.VisitorUrls=[];


	
   	


   	MyLiveChat.VisitorLocation="US|United States|NC|North Carolina|Apex";
   	MyLiveChat.LastLoadTime=new Date().getTime();
   	MyLiveChat.VisitorDuration=22;
   	MyLiveChat.VisitorEntryUrl="https://thefamilyschoolonline.org/";
   	MyLiveChat.VisitorReferUrl=null;

   	MyLiveChat.VisitorUrls=[];



   	
   	MyLiveChat.VisitorUrls.push("https://thefamilyschoolonline.org/");
   	

   	MyLiveChat_Initialize();

   	if(MyLiveChat.localStorage||MyLiveChat.userDataBehavior)
   	{
   		MyLiveChat_SyncToCPR();
   	}
	
   	