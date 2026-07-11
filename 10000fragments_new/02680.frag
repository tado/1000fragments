uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.89 + ph), sin(lt * 5.0 + t * 1.17)) * 0.99;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.13) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.19 + vec2(t * 1.11, -t * 1.37) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.17 - t * 1.57 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.20;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 2.86;
	q1 = rot2(2.14) * q1;
	q3 = (floor(q3 * 27.9) + 0.5) / 27.9;
	{ float lr = log(length(q3) + 0.001); float la = atan(q3.y, q3.x); q3 = vec2(la * 2.28, lr * 2.64 + time * -0.41); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.33);
	float d3 = fieldC(q3, time, 0.23);
	d2 = min(d2, d3);
	float d = abs(d1 - d2);
	float cc = clamp(0.5 + 0.5 * d, 0.0, 1.0);
	vec3 col = mix(vec3(0.01, 0.19, 0.53), vec3(0.75, 0.66, 0.97), cc);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
