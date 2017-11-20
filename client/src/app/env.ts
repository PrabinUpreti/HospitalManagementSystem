export class ENV {
    public static hospital = "Hetauda Hospital Pvt. Ltd";
    public static address = "Hetauda-10, Makwanpur Nepal";
    public static pan_Number = "PAN-288-35-100";
    public static phone_number = "+977 9845566982";
    public static phone2 = "057 528884";
    public static phone3 = "057 974568";
    public static phone4 = "+977 9686625698";
    public static Request_URL = "http://server.hms.com/";
    public static RegNo="Reg-3651625123";
    public static established="2050 Bs";
    public static website = "http://softwebdevelopers.com.np";
    public static email = "softwebdevelopers@gmail.com";
    public static country = "Nepal";
    
    public static userName = "SoftWeb Developers"
    
    public static time;
    public static cal;

    public static setSection(){
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
