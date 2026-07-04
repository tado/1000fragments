uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.80; vec2 vi = floor(vp); vec2 vf = fract(vp); float m1 = 8.0; float m2 = 8.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.93 + 6.2831853 * pt + ph);
        float dl = length(nb + pt - vf);
        if(dl < m1){ m2 = m1; m1 = dl; } else if(dl < m2){ m2 = dl; } }
    v = (m2 - m1) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.57, 0.0)) * 39.86 - t * 7.11 + ph);
    float mb = sin(length(p + vec2(0.57, 0.0)) * 11.54 - t * 7.16 + ph);
    v = ma * mb;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.54 + ph), sin(lt * 4.0 + t * 1.37)) * 0.82;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.42) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.03;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ q1 = vec2(atan(q1.y, q1.x) * 2.97, length(q1) * 4.28 - time * 0.52); }
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.45 / wf * sin(wf * 2.45 * q3.y + time * 1.71); q3.y += 0.41 / wf * cos(wf * 2.26 * q3.x + time * 1.60); }
	q3 = sin(q3 * 2.35 + time * 2.02) * 0.85;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.55);
	float d3 = fieldC(q3, time, 1.12);
	d2 = max(d2, d3);
	float d = max(d1, d2);
	vec3 col = vec3(0.26, 0.72, 0.52) * (0.15 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	col *= 0.85 + 0.18 * sin(gl_FragCoord.y * 1.67 + time * 9.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
