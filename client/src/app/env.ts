export class ENV {
    public static hospital:string="Hetauda Hospital Pvt.Ltd";
    public static pan_Numner:string="Htd-200902-88";
    public static address:string="Makawanpur,Hetauda-10";
    public static phone_number:string="057-2520092,057-688686";
    public static Request_URL = "http://server.hms.com";
    public static RegNo:string = "Reg-0123456789";
    public static established:string ="2050 B.S"
    public static tempusername;
    public static userName
    
    public static time;
    public static cal;

    public static setSection(){
        this.tempusername =JSON.parse(localStorage.getItem('user'))
        this.userName = this.tempusername.name
        var ed = new Date();
        var hour=ed.getHours();
        var minute=ed.getMinutes();
        let sectionStatus;
        this.time=hour*60+minute;
        this.cal = localStorage.getItem("keyTime");
         if(this.time - this.cal >= 30){
            sectionStatus = "sessionExpired";
         }else{
            localStorage.setItem("keyTime", JSON.stringify(this.time))
         }
         if(sectionStatus == "sessionExpired"){
            return sectionStatus;
         }
    }
}
