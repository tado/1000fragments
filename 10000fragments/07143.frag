uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.49 + sr * 9.17 - t * 4.41 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 1.18 + ph), sin(lt * 5.0 + t * 1.37)) * 0.87;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.02) * 2.0 - 1.0;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.42, 0.0)) * 20.69 - t * 4.21 + ph);
    float mb = sin(length(p + vec2(0.42, 0.0)) * 31.71 - t * 1.74 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.37;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 3.91 + time * 0.64) * q1;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(q2); q2 *= 1.0 + -0.62 * fr * fr; }
	q2 = rot2(time * 0.75) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.87);
	float d3 = fieldC(q3, time, 1.34);
	d2 = abs(d2 - d3);
	float d = min(d1, d2);
	vec3 col = 0.5 + 0.5 * cos(vec3(0.0, 2.094, 4.188) + d * 3.29 + time * 0.84);
	col = mod(col * 1.34, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
