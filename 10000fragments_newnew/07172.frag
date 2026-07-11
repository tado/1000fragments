uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 8.55);
    float gsh = hash21(vec2(grow, floor(t * 8.07))) - 0.5;
    float gx = p.x + gsh * 1.03;
    v = sin(gx * 18.06 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 2.19));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 5.05; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 1.19 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 23.29);
    float gsh = hash21(vec2(grow, floor(t * 5.93))) - 0.5;
    float gx = p.x + gsh * 0.93;
    v = sin(gx * 13.66 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 3.69));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.25 / wf * sin(wf * 3.69 * q2.y + time * 1.67); q2.y += 0.28 / wf * cos(wf * 3.24 * q2.x + time * 1.98); }
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 1.64, lr * 2.32 + time * -0.80); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.72);
	float d3 = fieldC(q3, time, 1.92);
	d2 = d2 * d3;
	float d = min(d1, d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.05, 0.11), vec3(0.73, 0.75, 0.42), cc);
	col = fract(col * 1.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
