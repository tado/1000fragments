uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int fi = 0; fi < 40; fi++){ float ff = float(fi) + 1.0;
        float ang = ff * 2.3999632 + t * 0.81 + ph * 0.2;
        vec2 sp = sqrt(ff) * 0.20 * vec2(cos(ang), sin(ang));
        md = min(md, length(p - sp)); }
    v = exp(-md * 8.86) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.46 + t * 3.89 + ph) * 0.7;
    float wb = sin(p.y * 18.98 - t * 1.57 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.28;
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.24, 0.0)) * 35.98 - t * 6.61 + ph);
    float mb = sin(length(p + vec2(0.24, 0.0)) * 26.67 - t * 3.83 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q1 *= 1.28;
	q1 = (floor(q1 * 25.0) + 0.5) / 25.0;
	q3 = rot2(length(q3) * -1.48 + time * 1.00) * q3;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.92);
	float d3 = fieldC(q3, time, 1.47);
	d2 = 0.5 * (d2 + d3);
	float d = 0.5 * (d1 + d2);
	vec3 col = hue(d * 1.16 + time * 0.23);
	col = mod(col * 2.41, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
