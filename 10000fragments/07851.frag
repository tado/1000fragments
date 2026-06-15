uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 36.95 - t * 1.23 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.00 + sr * 7.16 - t * 0.95 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 3.35 * p.y + time * 1.82); p.y += 0.38 / wf * cos(wf * 1.96 * p.x + time * 1.27); }
	{ p = vec2(atan(p.y, p.x) * 2.43, length(p) * 2.79 - time * 0.69); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.21 + time * 0.16, vec3(0.51, 0.49, 0.41), vec3(0.43, 0.33, 0.33), vec3(1.05, 0.98, 1.05), vec3(0.28, 0.31, 0.66));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
