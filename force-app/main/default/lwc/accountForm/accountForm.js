import { api, LightningElement, track } from 'lwc';
import createAccount from "@salesforce/apex/LC_AcountForm.createAccount";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class AccountForm extends LightningElement {
    @track firstName;
    @track lastName;
    @track email;
    @track phone;
    @track site;

    firstNameChanged(Event){
        this.firstName = Event.target.value;
        console.log('firstname '+ this.firstName);
    }

    lastNameChanged(Event){
        this.lastName = Event.target.value;
        console.log('lastName'+ this.lastName);
    }

    emailChanged(Event){
        this.email = Event.target.value;
        console.log('email'+ this.email);
    }
    phoneChanged(Event){
        this.phone = Event.target.value;
        console.log('email'+ this.phone);
    }
    siteChanged(Event){
        this.site = Event.target.value;
        console.log('email'+ this.site);
    }
    @track acc = {
        Name: this.firstName +' '+this.lastName,
        primaryContactEmail__c : this.email,
        Site: this.site,
        Phone: this.phone
    }


    // TODO à déplacer dans Util
    showToast(title, message, variant) {
        this.dispatchEvent(
        new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        })
        );
    }

    submitAccount(){
        console.log('submit');

        this.acc.Name = this.firstName +' '+this.lastName;
        this.acc.primaryContactEmail__c = this.email;
        this.acc.Site = this.site;
        this.acc.Phone = this.phone;

        console.log(this.acc);
        createAccount(
        {
            account: this.acc
        }).then(resp => {
            console.log({resp});
            this.showToast(
                "Succès",
                resp,
                "Success"
              );
        }).catch(err => {
            console.log(err);
            this.showToast(
                "Erreur !",
                'une erreur s\'est produite, contactez votre administrateur',
                "error"
              );        })
        console.log('finish');
    }
}