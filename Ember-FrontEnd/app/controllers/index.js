import Controller from '@ember/controller';

export default class IndexController extends Controller {
    actions = {
        setSelection: function(selected) {
            this.set('selectedOption', selected)
            console.log(this.get('selectedOption'))
        },
        submit: function(){
           // code to save or sendAction
           // e.g. let selectedOption = this.get('selectedOption')
           // this.sendAction('submit', selectedOption)
        }
    }
}
