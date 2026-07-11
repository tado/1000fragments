uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.58, 0.0)) * 8.96 - t * 2.38 + ph);
    float mb = sin(length(p + vec2(0.58, 0.0)) * 29.88 - t * 7.52 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 6.44 + t * 1.41 + ph) + sin(p.y * 2.79 - t * 1.41 + ph)
        + sin((p.x + p.y) * 7.41 + t * 1.41 + ph) + sin(length(p) * 10.92 - t * 1.41 + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.42 + ph), sin(lt * 3.0 + t * 1.01)) * 0.88;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.80) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.45; q1 = rot2(1.41) * q1; }
	{ float ka = atan(q3.y, q3.x); float kr = length(q3); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q3 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.66);
	float d3 = fieldC(q3, time, 0.86);
	d2 = d2 * d3;
	float d = max(d1, d2);
	vec3 col = palette(d * 1.11 + time * 0.30, vec3(0.46, 0.60, 0.43), vec3(0.41, 0.41, 0.36), vec3(1.24, 1.26, 1.24), vec3(0.27, 0.98, 0.83));
	col = fract(col * 1.99);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
