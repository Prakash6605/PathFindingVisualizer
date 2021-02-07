window.onload = function(){
    console.log("javascript is running ");
    // lets first create cells
    const row = 10 , col = 10;
    let start = false , end = false;
    let starting_cell;

    function print_the_path(srci,srcj,des_i,des_j,path_tracker){
        let cur_pos_i = des_i;
        let cur_pos_j = des_j;
        console.log(" src_ i " ,srci, " src_j ",srcj);
        let container = document.getElementById("container1");
        let cells = container.childNodes[0];
        //path_tracker[cur_pos_i][cur_pos_j].cur_i!=-1 && path_tracker[cur_pos_i][cur_pos_j].cur_j!=-1
        while(cur_pos_i!=srci || cur_pos_j!=srcj){
             console.log(cur_pos_i, " " ,cur_pos_j);
             console.log(path_tracker[cur_pos_i][cur_pos_j]);
             let cur_pos_ii = path_tracker[cur_pos_i][cur_pos_j].cur_i;

             let current_row = cells.childNodes[cur_pos_i];
             let current_col = current_row.childNodes[cur_pos_j];

             current_col.style["background-color"] = "#aae65d";//#7ebe88
             
             let cur_pos_jj = path_tracker[cur_pos_i][cur_pos_j].cur_j;
             cur_pos_i = cur_pos_ii;
             cur_pos_j = cur_pos_jj;
        }
        let current_row = cells.childNodes[cur_pos_i];
        let current_col = current_row.childNodes[cur_pos_j];

        current_col.style["background-color"] = "#aae65d";
             
        console.log(cur_pos_i, " " , cur_pos_j);
        console.log(" path printed ");
    }

    async function BFS(src_i,src_j,target){
        
        // four dircetion to move
        const x = [-1,1,0,0];const y=[0,0,-1,1];
        // creating a queue data structures
        let queue = new Array();
        // creating a two array to keep track of visited vertices
        let visited = new Array(row);
        for(let i=0;i<row;i++){
            visited[i] = new Array(col);
        }
        // initializing the visited array 
        for(let i=0;i<row;i++){
            for(let j=0;j<col;j++){
                visited[i][j]=false;
            }
        }
        // i will create a 2d array that will store the path from des to source
        let path_tracker = new Array(row);
        for(let i=0;i<row;i++){
            path_tracker[i] = new Array(col);
        }

        queue.push([src_i,src_j]);
        visited[src_i][src_j]=true;
        path_tracker[src_i][src_j]={cur_i :-1,cur_j :-1};
         
        // getting the access of DOM elements
        const container = document.getElementById("container1");
        const cells = container.childNodes[0];

        

        while(queue.length!=0){
            // accessing the element at 0th position
            let cur_i = queue[0][0];
            let cur_j = queue[0][1];
    
            queue.shift(); // removing the first element from the queue

            let current_row = cells.childNodes[cur_i];
            let current_col = current_row.childNodes[cur_j]; // This is the actual cell
            
            // see here where the cell is being poped ou from the queue i have to change its color
            // if(cur_i!=src_i || cur_j!=src_j){
            // current_col.style["background-color"] = "#9b9b9b";
             
            // await new Promise(resolve=>{
            //     setTimeout(function(){
            //        resolve();
            //     },300);
            // })

            // current_col.style["background-color"] = "#dad4d4";
            // } 

            //console.log(" current cell is " , current_col);
            if(current_col == target){
                // found the path
                console.log("found the path ");
                print_the_path(src_i,src_j,cur_i,cur_j,path_tracker);
                break;
            }

            for(let i=0;i<4;i++){
                let xx = cur_i + x[i];
                let yy = cur_j + y[i];

                if(xx>=0 && xx<row && yy>=0 && yy<col && visited[xx][yy]==false){
                    queue.push([xx,yy]);
                    path_tracker[xx][yy] = {cur_i,cur_j};
                    let present_row = cells.childNodes[xx];
                    let present_col = present_row.childNodes[yy];
                    current_col.style["background-color"] = "#9b9b9b";
                    await new Promise(resolve=>{
                        setTimeout(function(){
                            resolve();
                        },100);
                    })
                    //current_col.style["background-color"] = "#dad4d4";
                    visited[xx][yy] = true;
                    // here again i have to get the cell and change its color to green
                }
            }

        }

    }
    function BFS_init(target_cell){
        let container = document.getElementById("container1");
        let cells = container.childNodes[0];
        
        for(let i=0;i<row;i++){
            let current_row = cells.childNodes[i];
            for(let j=0;j<col;j++){
               let current_col = current_row.childNodes[j];
               if(current_col == starting_cell){
                   BFS(i,j,target_cell);
                   break;
               }
            }
        }
    }
    function clicked(){
        console.log(" Button clicked " , this);
        if(start==false){
            this.innerHTML = "S"
            this.style["background-color"]="#aae65d";
            starting_cell = this;
            start =true;
        }
        else if(end==false){
            this.innerHTML="E";
            this.style["background-color"]="orange";
            end = true;
            // from here i have to initaite the process
            BFS_init(this);
        }
        else alert("Start and End is already choosen ");
        
    }
    function generate_cells(){
       let container = document.getElementById("container1");
       let table = document.createElement("table");
       // creating rows and colums
       for(let i=0;i<row;i++){
           let r = document.createElement("tr");
           for(let j=0;j<col;j++){
               let c = document.createElement("td");
               c.classList = "col";
               c.onclick = clicked;
               r.appendChild(c);
           }
           table.appendChild(r);
       }
       container.appendChild(table);
    }

    generate_cells();
}