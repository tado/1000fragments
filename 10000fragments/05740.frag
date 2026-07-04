uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.14 * cos(sa * 9.0 + t * 0.80 + ph);
    v = sin((sr - petal) * 13.45);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.36 + ph), sin(lt * 1.0 + t * 1.05)) * 0.65;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.37) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.54;
	vec2 q1 = p; vec2 q2 = p;
	{ float iv = dot(q1, q1) + 0.05; q1 = q1 / iv * 0.58; }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; q1.x += 0.36 / wf * sin(wf * 3.56 * q1.y + time * 2.18); q1.y += 0.29 / wf * cos(wf * 1.58 * q1.x + time * 0.78); }
	q2 = rot2(time * -0.82) * q2;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; q2.x += 0.42 / wf * sin(wf * 2.21 * q2.y + time * 1.59); q2.y += 0.27 / wf * cos(wf * 2.47 * q2.x + time * 1.34); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.92);
	float d = d1 * d2;
	vec3 col = vec3(0.64, 0.18, 0.90) * (0.18 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	col = mod(col * 1.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
