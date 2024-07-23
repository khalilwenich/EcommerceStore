import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import db from "@/db/db";
import prisma from "@/db/db";



async function getSalesData(){
   const data = await db.order.aggregate({
        _sum:{pricePaid : true},
        _count: true
    })
    return {
        amount : (data._sum.pricePaid || 0) /100,
        numberOfSales: data._count
    }
}


export default async function  AdminDashboard(){
    const salesData =await  getSalesData()
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"> 
    <DashboardCard title="Sales" subtitle={salesData.numberOfSales} body={salesData.amount}/>
    </div>
}

type DashborardCardProps={
    title: string
    subtitle: string
    body: string 

}

function DashboardCard({title,subtitle,body}:
    DashborardCardProps){
        return <Card>
        <CardHeader>{title}</CardHeader>
        <CardDescription>{subtitle}</CardDescription>
        <CardContent><p>{body}</p></CardContent>
    </Card>
    }
