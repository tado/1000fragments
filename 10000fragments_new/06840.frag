uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.37, 0.0)) * 10.91 - t * 1.32 + ph);
    float mb = sin(length(p + vec2(0.37, 0.0)) * 9.92 - t * 6.49 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.48 + 0.20 * cos(sa * 4.0 + t * 0.96 + ph);
    v = sin((sr - petal) * 17.18);
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.35 + ph), sin(lt * 2.0 + t * 0.97)) * 0.73;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.10) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.54;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; q1.x += 0.34 / wf * sin(wf * 3.00 * q1.y + time * 2.15); q1.y += 0.23 / wf * cos(wf * 2.36 * q1.x + time * 1.89); }
	q1 += vec2(-0.29, 0.62) * sin(length(q1) * 3.29 - time * 1.84) * 0.19;
	q2 = rot2(length(q2) * 3.29 + time * 0.78) * q2;
	q2 = rot2(0.37) * q2;
	q3.x += sin(q3.y * 6.90 + time * 3.40) * 0.29;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.74);
	float d3 = fieldC(q3, time, 1.55);
	d2 = d2 * d3;
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 1.50));
	vec3 col = palette(d * 1.42 + time * 0.38, vec3(0.51, 0.41, 0.40), vec3(0.35, 0.40, 0.40), vec3(1.32, 1.27, 1.03), vec3(0.46, 0.81, 0.87));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
