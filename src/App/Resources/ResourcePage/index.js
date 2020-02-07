import React, {useState} from 'react';
import {useRequest} from "../../../Hooks/Hooks";
import {
    ResourceComments,
    ResourceDescription,
    ResourceHeader,
    ResourcePage, ResourceTag, ResourceTags,
    ResourceTitle,
    AddTagInput, ResourceContent, TagSearchResults, SearchResultTag
} from "./Styles";
import  TextEditor  from "../../Components/TextEditor";
import ViewPost from '../../Feed/Post/ViewPost';
import {makeRequest} from "../../Api/Api";

const ResourceInfoPage = (props) => {

    const [resource, setResource, isLoading] = useRequest(`resources/${props.match.params.rid}`, 'get');
    const [description, setDescription] = useState(resource.description);
    const [tagSearch, setTagSearch] = useState('');

    const [results, setResults, isLoadingResults] = useRequest(`resources/tags?q=${tagSearch}`, 'get');

    console.log(resource, isLoading);

    const handleDescriptionChange = (e) => {
        setDescription(e);
        setResource({...resource, description: e})
    };

    const renderSearchResults = () => {
        return (
            results
                .filter(tag => !resource.tags.find(t => t.tag_id === tag.tag_id)) // make sure we don't show already added tags
                .map(tag => {
                    return (
                        <SearchResultTag
                            key={tag.tag_id}
                            color={tag.color}
                        >
                            # {tag.title}
                            <span
                                style={{marginLeft: 'auto'}}
                                onClick={() => addTag(tag)}
                            >
                                +
                            </span>
                        </SearchResultTag>
                    )
                }
            )
        )
    };

    const addTag = async (tag) => {
        let resp = await makeRequest('resources/add_tags', 'post', {
            tag: tag,
            rId: props.match.params.rid
        });
        if (resp?.data) {
            setResource({...resource, tags: [...resource.tags, resp.data]})
        }
    };

    return (
        <ResourcePage>
            <ResourceHeader>
                <ResourceTitle>
                    <a href={`${resource.link}`}>{resource.title}</a>
                </ResourceTitle>
                <ResourceTags>
                    {!isLoading && !!resource.tags.length && resource.tags.map(tag => {
                        return(
                            <ResourceTag key={tag.tag_id} color={tag.color}>
                                # {tag.title}
                            </ResourceTag>
                        )})
                    }

                </ResourceTags>
            </ResourceHeader>
            <ResourceContent>
                <ResourceDescription full={resource?.tags?.length > 2}>
                    {!isLoading &&
                        <TextEditor
                            state={resource.description}
                            setState={(e) => handleDescriptionChange(e)}
                        />
                    }
                </ResourceDescription>
                    {resource?.tags?.length < 3 &&
                    <TagSearchResults>
                        <AddTagInput
                            value={tagSearch}
                            onChange={(e) => {setTagSearch(e.target.value)}}
                            placeholder={'+ Add Tag'}
                        />
                        {!isLoadingResults && renderSearchResults()}
                    </TagSearchResults>
                    }
            </ResourceContent>

            <ResourceComments>
                {!isLoading &&
                    <ViewPost
                        focusList={{focus: [resource.username], title: 'author'}}
                        commentthread={resource.commentthread}
                    />
                }
            </ResourceComments>
        </ResourcePage>
    )
};

export default ResourceInfoPage;
