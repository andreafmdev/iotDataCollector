/* Generic Finite State Machine Library */

#include "ReferenceCaller.h"
//------------------------- DEFINE --------------------//
#define FSM_STATE_RESET     0
#define FSM_STATE_INIT      1
#define FSM_STATE_RUN       2
#define FSM_STATE_POWERDOWN 3

#define MAX_OPERATION_OPTION    4
#define HANDLE_PING             0
#define HANDLE_HTTP_GET_ALL     1
#define HANDLE_HTTP_GET_STATUS  2
#define HANDLE_HTTP_POST        3

//------------------------- GLOBAL VARIABLES ------------//

static uint8_t fsm_main_state = FSM_STATE_INIT;
static bool setup_enable = false;
uint8_t optionTohandle;
String dataStreamReceived = "";

//------------------------- FUNCTIONS -------------------//

bool FSM_loop(uint8_t &fsm_state)
{
    switch (fsm_state)
    {
    case FSM_STATE_RESET: 
        fsm_state = FSM_STATE_INIT;
        break;
    case FSM_STATE_INIT:
        setup_enable = true;
        setup();
        fsm_state = FSM_STATE_RUN;
        break;
    case FSM_STATE_RUN:
        TCPServer(dataStreamReceived);
        
        optionTohandle = random(MAX_OPERATION_OPTION);
        switch (optionTohandle)
        {
        case HANDLE_PING:
            handlePingEvent();
            break;
        case HANDLE_HTTP_GET_ALL:
            handleHttpGetAllEvent();
            break;
        case HANDLE_HTTP_GET_STATUS:
            handleHttpGetAllEvent();
            break;
        case HANDLE_HTTP_POST:
            handleHttpPostInsertEvent();
            break;
        default:
            break;
        }
        break;
    default:
        break;
    }
    return true;
}