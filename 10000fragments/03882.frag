uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.29, 0.0)) * 32.45 - t * 4.45 + ph);
    float mb = sin(length(p + vec2(0.29, 0.0)) * 30.59 - t * 5.58 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.48 + 0.28 * pow(abs(cos(ra * 2.0 + t * 2.46)), 1.65);
    v = sin((rr - pet) * 9.76 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.33) * p;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 1.53 * p.y + time * 1.28); p.y += 0.22 / wf * cos(wf * 3.25 * p.x + time * 1.44); }
	p.y += sin(p.x * 7.78 + time * 1.74) * 0.24;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.07);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.78 + time * 0.13, vec3(0.54, 0.57, 0.43), vec3(0.40, 0.46, 0.43), vec3(1.15, 1.34, 1.25), vec3(0.47, 0.19, 0.33));
	col = mod(col * 2.74, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
