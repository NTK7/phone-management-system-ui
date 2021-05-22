import easyinvoice from 'easyinvoice';
import uniqid from 'uniqid';
import { db, storage } from '../../firebase';
import firebase from 'firebase';

export const generateBill = async (billingItems) => {
	console.log(billingItems);
	let data = {
		//"documentTitle": "RECEIPT", //Defaults to INVOICE
		//"locale": "de-DE", //Defaults to en-US, used for number formatting (see docs)
		currency: 'USD', //See documentation 'Locales and Currency' for more info
		// taxNotation: 'vat', //or gst
		marginTop: 25,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 25,
		logo: 'http://www.jijichiz.com/wp-content/uploads/2018/12/Apple-logo-grey-880x625.png', //or base64
		// background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg', //or base64 //img or pdf
		sender: {
			company: 'Sample Corp',
			address: 'Sample Street 123',
			zip: '1234 AB',
			city: 'Sampletown',
			country: 'Samplecountry',
			//"custom1": "custom value 1",
			//"custom2": "custom value 2",
			//"custom3": "custom value 3"
		},
		client: {
			company: 'Client Corp',
			address: 'Clientstreet 456',
			zip: '4567 CD',
			city: 'Clientcity',
			country: 'Clientcountry',
			//"custom1": "custom value 1",
			//"custom2": "custom value 2",
			//"custom3": "custom value 3"
		},
		invoiceNumber: '2021.0001',
		invoiceDate: '1.1.2021',
		products: billingItems.map((item) => ({
			quantity: item.billingQuantity,
			description: item.brand + ' ' + item.model,
			tax: 0,
			price: (item.totalBill)/item.billingQuantity,
		})),

		bottomNotice: 'Kindly pay your invoice within 15 days.',
		//Used for translating the headers to your preferred language
		//Defaults to English. Below example is translated to Dutch
		// "translate": {
		//     "invoiceNumber": "Factuurnummer",
		//     "invoiceDate": "Factuurdatum",
		//     "products": "Producten",
		//     "quantity": "Aantal",
		//     "price": "Prijs",
		//     "subtotal": "Subtotaal",
		//     "total": "Totaal"
		// }
	};

	//Create your invoice! Easy!
	const result = await easyinvoice.createInvoice(data);
	let id_ = uniqid();

	db.collection('bill-base64').add({
		billBase64: result.pdf,
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
	});

	// Downloading Bill
	easyinvoice.download(`customer-bills/${id_}.pdf`, result.pdf);
};


// {
// 	brand,
// 	quantity,
// 	billingQuantity,
// 	sellingprice,
// 	totalBill,
// 	code,
// 	model,
// 	originalPrice,
// 	vendor,
// 	date,
// }