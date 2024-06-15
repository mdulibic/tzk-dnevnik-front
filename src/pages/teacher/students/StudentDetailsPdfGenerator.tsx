import jsPDF from 'jspdf';
import 'jspdf-autotable';
import {Student} from "@/model/Student.ts";
import {formatDateTime, getCurrentSchoolYear} from "@/utils.ts";
import {ActivityResult} from "@/model/ActivityResult.ts";
import autoTable from "jspdf-autotable";

export const generatePdf = (student: Student | null, bmi: number | undefined, results: ActivityResult[] | undefined) => {
    const pdf = new jsPDF('p', 'mm', 'a4');

    pdf.setFont('Times', 'normal');
    pdf.setFontSize(12);

    pdf.setFillColor(79, 129, 189);
    pdf.rect(0, 0, 210, 20, 'F');

    pdf.setTextColor(255, 255, 255);
    pdf.setFont('Times', 'bold');
    pdf.setFontSize(18);
    pdf.text('ŠKOLSKI IZVJEŠTAJ', 105, 14, {align: 'center'});

    pdf.setFontSize(14);
    pdf.setTextColor(0);
    pdf.text(`Osnovne informacije`, 13, 30);

    pdf.setFont('Times', 'normal');
    pdf.setFontSize(12);

    pdf.text(`${student?.name} ${student?.surname}`, 13, 37);
    pdf.text(`E-mail: ${student?.email}`, 13, 45);
    pdf.text(`Razred: ${student?.schoolClass.year}.${student?.schoolClass.division}`, 130, 37);
    pdf.text(`Generacija: ${getCurrentSchoolYear()}`, 130, 45);

    pdf.setLineWidth(0.1);
    pdf.line(10, 50, 200, 50);

    pdf.setFontSize(14);
    pdf.setFont('Times', 'bold');
    pdf.text('Morfološka obilježja', 13, 60);

    pdf.setFont('Times', 'normal');
    pdf.setFontSize(12);
    pdf.text(`Visina: ${student?.height} cm`, 13, 68);
    pdf.text(`Težina: ${student?.weight} kg`, 13, 76);
    pdf.text(`ITM (indeks tjelesne mase): ${bmi?.toFixed(2)}`, 13, 84);

    pdf.setFont('Times', 'bold');
    pdf.setFontSize(14);

    pdf.line(10, 90, 200, 90);

    pdf.text('Rezultati kroz školsku godinu', 13, 100);

    const head = [['Aktivnost', 'Podaktivnost', 'Rezultat', 'Mjera', 'Vrijeme']];
    const data = results?.map(result => [
        result.activity.name,
        result.subactivity ? result.subactivity.name : '',
        result.result,
        result.unit,
        formatDateTime(result.timestamp)
    ]) || [];

    const itemDetailsYStart = 105;

    autoTable(pdf, {
        head: head,
        body: data,
        startY: itemDetailsYStart,
        margin: {top: 10, left: 13},
        theme: 'striped',
        styles: {cellPadding: 2, fontSize: 10},
        headStyles: {fillColor: [79, 129, 189], textColor: 255, fontStyle: 'bold'},
        columnStyles: {0: {fontStyle: 'italic'}},
    });

    const pdfDataUri = pdf.output('datauristring');
    const newTab = window.open();
    newTab?.document.write(`<iframe width='100%' height='100%' src='${pdfDataUri}'></iframe>`);
}
