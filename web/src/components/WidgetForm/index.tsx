import { useState } from "react";


import bugImageUrl from "../../assets/bug.svg";
import ideaImageUrl from "../../assets/idea.svg";
import thoughtImageUrl from "../../assets/thought.svg";
import { FeedbackTypeStep } from "./Steps/FeedbackTypeStep";
import { FeedbackContentStep } from "./Steps/FeedbackContentStep";
import { FeedbackSuccessStep } from "./Steps/FeedbackSuccessStep";


export const feedbackTypes = {
    BUG: {
        title: 'Problema',
        image: {
            source: bugImageUrl,
            alt: 'Imagem inseto'
        }
    },
    IDEA: {
        title: 'Ideia',
        image: {
            source: ideaImageUrl,
            alt: 'Imagem lampada'
        }
    },
    OTHER: {
        title: 'Outros',
        image: {
            source: thoughtImageUrl,
            alt: 'Imagem balão'
        }
    }
}

export type FeedbackType = keyof typeof feedbackTypes;

export function WidgetForm (){

    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const[feedbackSent, setFeedbackSent] = useState(false);


    const handleRestartFeedback = () =>{
        setFeedbackSent(false);
        setFeedbackType(null);
    }

    return(
        <div 
            className="
                bg-zinc-900 
                p-4 
                relative 
                rounded-2xl 
                mb-4 
                flex 
                flex-col 
                items-center 
                shadow-lg
                w-[calc(100vw-2rem)]
                md:w-auto
            "
        >
         {feedbackSent ? (
             <FeedbackSuccessStep onFeedbackRestartRequest={handleRestartFeedback}/>
         ) : (
             <>
                {!feedbackType ? (
                <FeedbackTypeStep onFeedbackTypeChanged={setFeedbackType} />
            ) : (
                <FeedbackContentStep 
                feedbackType={feedbackType} 
                onRestartFeedback={handleRestartFeedback}
                onFeedbackSent={()=>setFeedbackSent(true)}
                />
            )}
             </>
         )}

           <footer className=" text-xs text-neutral-400">
                Feito com ♥ por <a className="underline underline-offset-2" href="https://github.com/HeriSanDev"> HeriSanDev </a>
           </footer>
        </div>
    )

}