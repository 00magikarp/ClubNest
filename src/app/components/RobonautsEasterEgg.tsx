'use client';

import { useState } from "react";
import Image from "next/image";
import { Button } from "@mui/material";

export default function RobonautsImage() {
    const [showImage, setShowImage] = useState(true);
    return (
        <div>
            <Button sx={{
                color: 'text.primary'
            }}onClick={() => setShowImage(!showImage)}>CLICK ME</Button>
            { showImage && (
                <Image src="/images/countlessscreamingrobonauts.avif" alt="PlaceHolder" width={400} height={400}></Image>
            )}
        </div>
    )
}