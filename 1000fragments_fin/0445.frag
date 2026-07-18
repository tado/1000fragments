uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec2 hash22(vec2 p){
    return fract(sin(vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)))) * 43758.5453);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 vp = p * 4.18; vec2 vi = floor(vp); vec2 vf = fract(vp); float md = 1.0;
    for(int vy = -1; vy <= 1; vy++) for(int vx = -1; vx <= 1; vx++){
        vec2 nb = vec2(float(vx), float(vy));
        vec2 pt = hash22(vi + nb); pt = 0.5 + 0.5 * sin(t * 2.47 + 6.2831853 * pt + ph);
        md = min(md, length(nb + pt - vf)); }
    v = md * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 4.64 * sin(t * 1.12) + t * 1.72 + ph);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 7.17 + ga * 4.0 - t * 0.92 + ph);
    v = arm * exp(-gr * 1.36);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.16;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2 = sin(q2 * 2.41 + (time * 0.62) * 0.71) * 0.86;
	q2 = rot2(q2.y * -1.14 + (time * 0.62) * 0.68) * q2;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q3.x += 0.43 / wf * sin(wf * 2.69 * q3.y + (time * 0.62) * 0.94); q3.y += 0.32 / wf * cos(wf * 2.57 * q3.x + (time * 0.62) * 1.61); }
	float d1 = fieldA(q1, (time * 0.62), 0.0);
	float d2 = fieldB(q2, (time * 0.62), 0.58);
	float d3 = fieldC(q3, (time * 0.62), 0.35);
	d2 = abs(d2 - d3);
	float d = d1 * d2;
	vec3 col = vec3(0.5 + 0.5 * (d)) * vec3(0.71, 0.80, 0.75) + vec3(0.09, 0.10, 0.05);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.74));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.34);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.12);
	col *= vec3(1.050, 1.009, 0.919);
	col += 0.008;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.46 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
