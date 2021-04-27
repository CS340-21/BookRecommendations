import Controller from '@ember/controller';

export default Controller.extend({
    userInput: "",
     
    actions: {
        setSelection: function(selected) {
            this.set('selectedOption', selected);
            console.log(this.selectedOption);
            this.set('filterError', null);
        },
        search: async function(){
            console.log(this.userInput);

            if (this.selectedOption == null) {
                this.set('filterError', "Please select a filter type");
                return;
            }

            let books = {};

            try {
                if (this.selectedOption == "inauthor") {
                    books = await this.store.query('book', {
                        inauthor: this.userInput,
                    });
                } else {
                    books = await this.store.query('book', {
                        subject: this.userInput,
                    });
                }
            } catch (err) {
                this.set('searchError', `No results found for \"${this.userInput}\". Please refine search criteria.`);
                return;
            }

            this.set('searchError', null);
            books = books.map((book) => book.toJSON({ includeId: true }));
            this.set('model', books);
        }
    }
});
