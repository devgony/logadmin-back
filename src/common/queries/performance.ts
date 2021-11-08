const pool = 'select 1 as col1 from dual';

export const perfQ = `
SELECT 
(SELECT ROUND(AVG(VALUE/10), 0) FROM V$CON_SYSMETRIC WHERE METRIC_ID = 18048 GROUP BY METRIC_NAME) AS CPU
,(SELECT ROUND(AVG(VALUE), 0) FROM V$CON_SYSMETRIC WHERE METRIC_ID = 18016 GROUP BY METRIC_NAME) AS LOGICAL_READS
,(SELECT ROUND(AVG(VALUE), 0) FROM V$CON_SYSMETRIC WHERE METRIC_ID = 18020 GROUP BY METRIC_NAME) AS PHYSICAL_READS
,(SELECT ROUND(AVG(VALUE), 0) FROM V$CON_SYSMETRIC WHERE METRIC_ID = 18018 GROUP BY METRIC_NAME) AS EXECUTIONS
,(SELECT COUNT(*) FROM V$SESSION WHERE STATUS='ACTIVE') AS ACTIVE_SESSIONS
,(SELECT COUNT(*)
    from (
        select rownum, inst_id, decode(request,0,to_char(sid)) hold_sid
                ,decode(request,0,'^',to_char(sid)) wait_sid, sid
                ,decode(request,0,'holding','wating') gb,
                id1, id2, lmode, request, type
            from gv$lock
            where id1 in (select id1 from gv$lock where lmode=0)
        ) v
        ,gv$session s
        ,gv$session_wait sw
        ,gv$process p
    where 1=1
    and v.sid = s.sid
    and v.inst_id = s.inst_id
    and s.sid = sw.sid
    and s.inst_id = sw.inst_id
    and s.paddr = p.addr
    and s.inst_id = p.inst_id
) AS LOCK_SESSIONS
FROM DUAL
`;

const CPUbySession = `
SELECT se.username, ss.sid, ROUND (value/100) "CPU Usage"
FROM v$session se, v$sesstat ss, v$statname st
WHERE ss.statistic# = st.statistic#
AND name LIKE  '%CPU used by this session%'
AND se.sid = ss.SID 
AND se.username IS NOT NULL
ORDER BY value DESC
`;

const z = `
SELECT metric_name, metric_id FROM V$CON_SYSMETRIC WHERE REGEXP_LIKE(METRIC_NAME, 'EXEC', 'i')
`;

export const activeSessionQ = `
SELECT 
 LAST_CALL_ET AS ELAPSED_TIME
,SID
,S.SERIAL# as SERIAL
,S.USERNAME
,MACHINE
,EVENT
,(SELECT SQL_TEXT FROM V$SQL SQ WHERE SQ.SQL_ID = S.SQL_ID AND ROWNUM=1) AS SQL_TEXT
,(SELECT SQL_TEXT FROM V$SQL SQ WHERE SQ.SQL_ID = S.PREV_SQL_ID AND ROWNUM=1) AS PREV_SQL_TEXT
,S.BLOCKING_SESSION
,S.PROGRAM
,MODULE
,ACTION
,LOGON_TIME
,PREV_EXEC_START
,P.SPID
FROM V$SESSION S
    ,V$PROCESS P
WHERE 1=1
AND S.PADDR = P.ADDR
AND S.STATUS = 'ACTIVE'
AND S.USERNAME IS NOT NULL
AND S.SERVICE_NAME NOT LIKE '%BACKGROUND%'
--AND S.SID <> SYS_CONTEXT('USERENV','SID')
ORDER BY LAST_CALL_ET DESC
`;
