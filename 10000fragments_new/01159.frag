uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.67 + 0.21 * cos(sa * 7.0 + t * 1.92 + ph);
    v = sin((sr - petal) * 14.01);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.92 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.19 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.40) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 += vec2(0.52, -0.91) * sin(length(q1) * 2.46 - time * 1.42) * 0.15;
	{ q2 = vec2(atan(q2.y, q2.x) * 1.40, length(q2) * 2.80 - time * 0.45); }
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.34; q2 = rot2(2.23) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.12);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.45 + time * 0.04);
	col = mod(col * 1.80, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
