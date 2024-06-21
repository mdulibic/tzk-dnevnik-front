import {BASE_API_URL, DATA_CLUSTERING_API_URL} from "@/constants.tsx";
import authHeader from "@/auth-header.tsx";
import {ActivityResult} from "@/model/ActivityResult.ts";
import {AddResultDto} from "@/pages/teacher/schedule/AddResultsByEvent.tsx";

export async function fetchResultsByClassId(classId: string): Promise<ActivityResult[]> {
    const response = await fetch(`${BASE_API_URL}/api/results/class/${classId}`, {
        method: 'GET',
        headers: {
            Origin: origin,
            Authorization: authHeader(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export async function fetchResultsByStudentId(studentId: string, year: string): Promise<ActivityResult[]> {
    const response = await fetch(`${BASE_API_URL}/api/students/${studentId}/results${year ? `?schoolYear=${year}` : ''}`, {
        method: 'GET',
        headers: {
            Origin: origin,
            Authorization: authHeader(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    return response.json();
}

export async function addResultForStudent(dto: AddResultDto) {
    const response = await fetch(`${BASE_API_URL}/api/results/add`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: authHeader(),
        },
        body: JSON.stringify(dto),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
}

export const downloadExcel = async (studentId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/report/student/excel/results/${studentId}`, {
            method: 'GET',
            headers: {
                Authorization: authHeader(),
            },
        });

        if (!response.ok) {
            alert('Network response was not ok');
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = blobUrl;
        link.download = 'rezultati.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error fetching Excel file:', error);
    }
};


export const downloadClassResults = async (classId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/report/student/excel/results/class/${classId}`, {
            method: 'GET',
            headers: {
                Authorization: authHeader(),
            },
        });

        if (!response.ok) {
            alert('Network response was not ok');
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = blobUrl;
        link.download = 'rezultati.xlsx';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error fetching Excel file:', error);
    }
};


export const downloadClusteringDataCsv = async (classId: string) => {
    try {
        const response = await fetch(`${BASE_API_URL}/api/results/csv/clustering/${classId}`, {
            method: 'GET',
            headers: {
                Authorization: authHeader(),
                Accept: 'text/csv', // Specify CSV content type
            },
        });

        if (!response.ok) {
            alert('Network response was not ok');
            throw new Error('Network response was not ok');
        }

        const blob = await response.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.style.display = 'none';
        link.href = blobUrl;
        link.download = 'clustering_data.csv';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
        console.error('Error fetching CSV file:', error);
    }
};

export async function generateDataClusteringReport(formData: FormData) {
    try {
        const response = await fetch(`${DATA_CLUSTERING_API_URL}/data-clustering/generate-pdf`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = 'report.pdf';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        alert('PDF file generated successfully!');
    } catch (error) {
        console.error('Error:', error);
        alert('Failed to generate PDF');
    }
}

