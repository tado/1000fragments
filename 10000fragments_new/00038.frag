uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 10.0 + qr * 6.71 * sin(t * 1.16) + t * 1.68 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.73 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.20 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.74) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 6.69; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 4.11 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = fract(q2 * 2.96) - 0.5;
	q3 = rot2(q3.y * 2.43 + time * 0.77) * q3;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; q3.x += 0.46 / wf * sin(wf * 3.00 * q3.y + time * 2.12); q3.y += 0.39 / wf * cos(wf * 3.94 * q3.x + time * 1.88); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.90);
	float d3 = fieldC(q3, time, 0.40);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.47));
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 2.26 + time * 0.78);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
