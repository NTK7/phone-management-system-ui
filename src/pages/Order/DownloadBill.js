import jsPDFInvoiceTemplate, { OutputType, jsPDF } from 'jspdf-invoice-template';
import uniqid from 'uniqid';
import { db, storage } from '../../firebase';
import firebase from 'firebase';
import currencyFormatter from 'currency-formatter';

export const generateBill = (billingItems, totalSales, discount, finalTotal) => {
	const id_ = uniqid();
	let props = {
		outputType: OutputType.DataUrlNewWindow,
		returnJsPDFDocObject: true,
		fileName: `Payment-bill-id-${id_}`,
		orientationLandscape: false,
		logo: {
			src: 'https://raw.githubusercontent.com/edisonneza/jspdf-invoice-template/demo/images/logo.png',
			width: 53.33, //aspect ratio = width/height
			height: 26.66,
			margin: {
				top: 0, //negative or positive num, from the current position
				left: 0, //negative or positive num, from the current position
			},
		},
		business: {
			name: 'Phone Management',
			address: 'Albania, Tirane ish-Dogana, Durres 2001',
			phone: '(+355) 069 11 11 111',
			email: 'email@example.com',
			email_1: 'info@example.al',
			website: 'www.example.al',
		},
		contact: {
			label: 'Invoice issued for:',
			name: 'Nazhim Kalam',
			address: 'Albania, Tirane, Astir',
			phone: '(+355) 069 22 22 222',
			email: 'client@website.al',
			otherInfo: 'www.website.al',
		},
		invoice: {
			label: `Invoice : ${id_}`,
			num: 1,
			invDate: 'Payment Date: 01/01/2021 18:12',
			invGenDate: 'Invoice Date: 02/02/2021 10:17',
			headerBorder: false,
			tableBodyBorder: false,
			header: ['#', 'Brand', 'Model', 'Qty', 'Unit Price', 'Total'],
			table: Array.from(Array(billingItems.length), (item, index) => [
				index + 1,
				billingItems[index].brand,
				billingItems[index].model,
				billingItems[index].billingQuantity,
				currencyFormatter.format(billingItems[index].sellingprice, { locale: 'en-US' }),
				currencyFormatter.format(billingItems[index].totalBill, { locale: 'en-US' }),
			]),
			invTotalLabel: 'SubTotal:',
			invTotal: currencyFormatter.format(totalSales, { locale: 'en-US' }),
			// invCurrency: 'Rs',
			row1: {
				col1: 'Discount: ',
				col2: currencyFormatter.format(discount, { locale: 'en-US' }),
				// col3: 'Rs',
				style: {
					fontSize: 12, //optional, default 12
				},
			},
			row2: {
				col1: 'Grand Total:',
				col2: currencyFormatter.format(finalTotal, { locale: 'en-US' }),
				// col3: 'Rs',
				style: {
					fontSize: 12, //optional, default 12
					fontStyle: 'bold',
				},
			},
			invDescLabel: 'Invoice Note',
			invDesc:
				"There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary.",
		},
		footer: {
			text: 'The invoice is created on a computer and is valid without the signature and stamp.',
		},
		pageEnable: true,
		pageLabel: 'Page ',
	};

	jsPDFInvoiceTemplate(props).jsPDFDocObject.save(`Payment-bill-id-${id_}`);
};
