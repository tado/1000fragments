uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.57 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.16 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 4.58) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float grow = floor(p.y * 10.97);
    float gsh = hash21(vec2(grow, floor(t * 6.86))) - 0.5;
    float gx = p.x + gsh * 0.50;
    v = sin(gx * 11.50 + ph) * (0.6 + 0.4 * sin(grow * 1.7 + t * 1.86));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.13 + sr * 5.34 - t * 2.40 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y = abs(p.y);
	p *= 1.51;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 = rot2(length(q1) * 1.21 + (time * 0.68) * 0.59) * q1;
	for(int fo = 0; fo < 2; fo++){ q2 = abs(q2) - 0.58; q2 = rot2(2.21) * q2; }
	float d1 = fieldA(q1, (time * 0.68), 0.0);
	float d2 = fieldB(q2, (time * 0.68), 1.87);
	float d3 = fieldC(q3, (time * 0.68), 1.08);
	d2 = max(d2, d3);
	float d = mix(d1, d2, 0.5 + 0.5 * sin((time * 0.68) * 1.40));
	vec3 col = palette((d) * 1.14 + (time * 0.68) * 0.13, vec3(0.20, 0.30, 0.23), vec3(0.28, 0.27, 0.29), vec3(0.50, 0.48, 0.85), vec3(0.55, 0.26, 0.32));
	col = clamp((col - 0.5) * 1.47 + 0.5, 0.0, 1.0);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col = clamp(col, 0.0, 1.0) * vec3(1.060, 1.004, 0.932) * 1.00 + 0.033;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
