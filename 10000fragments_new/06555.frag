uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.05;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.49; kp = rot2(1.31) * kp; kp *= 1.16; }
    v = sin(kp.y * 2.72 - t * 4.88 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.70 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.13 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 6.44) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * -0.73) * q1;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.22);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.87 + time * 0.34, vec3(0.51, 0.52, 0.48), vec3(0.37, 0.42, 0.41), vec3(0.71, 0.70, 1.36), vec3(0.45, 0.56, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
