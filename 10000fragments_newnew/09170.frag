uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 17.36 + t * 4.34 + ph) + sin(p.y * 3.04 - t * 1.38 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.21 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.14 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.94) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 8.74; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 3.49 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.84;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.20 * fr * fr; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q2.x += 0.21 / wf * sin(wf * 3.16 * q2.y + time * 1.17); q2.y += 0.20 / wf * cos(wf * 3.07 * q2.x + time * 1.48); }
	{ float iv = dot(q3, q3) + 0.05; q3 = q3 / iv * 0.65; }
	q3 = vec2(q3.x * q3.x - q3.y * q3.y, 2.0 * q3.x * q3.y) * 1.04;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.24);
	float d3 = fieldC(q3, time, 1.61);
	d2 = 0.5 * (d2 + d3);
	float d = abs(d1 - d2);
	vec3 col = vec3(0.55, 0.88, 0.26) * (0.16 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.53 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
