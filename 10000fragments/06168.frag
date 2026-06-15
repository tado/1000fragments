uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 21.26 - t * 3.95 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 21.76 - t * 3.95 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.72 + vec2(t * 1.82, -t * 1.82) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.47;
	p = rot2(p.y * 1.05 + time * 0.38) * p;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.32 / wf * sin(wf * 2.17 * p.y + time * 0.75); p.y += 0.26 / wf * cos(wf * 3.04 * p.x + time * 1.59); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.48);
	float d = d1 + d2;
	vec3 col = palette(d * 1.53 + time * 0.11, vec3(0.60, 0.46, 0.55), vec3(0.40, 0.40, 0.36), vec3(1.29, 1.08, 1.37), vec3(0.83, 0.28, 0.39));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
