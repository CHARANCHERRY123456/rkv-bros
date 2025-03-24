import {useParams} from 'react-router-dom';
import {useQueryClient , useMutation , useQuery} from 'react-query';
import ContentApi from '../../../utils/api.js';

const AssignmentPage = ()=>{
    const {id} = useParams();
    const queryClient = useQueryClient();

    const {data : assignment , isLoading} = useQuery(['assignment' , id] , 
        ()=> ContentApi.fetchAssignments(id)
    );

    const mutation = useMutation(ContentApi.submitResponse , {
        onSuccess : ()=>{
            queryClient.invalidateQueries(['assignment' , id]);
        },
    });

    if(isLoading) return <p>Loasing assignment</p>

    return (
        <div className="p-4">
          <h1 className="text-xl font-bold">{assignment.name}</h1>
          {assignment.questions.map((q, index) => (
            <QuestionCard key={index} question={q} assignmentId={id} questionIndex={index} onSubmit={mutation.mutate} />
          ))}
        </div>
    );
}

export default AssignmentPage;