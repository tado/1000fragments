uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.10;
    for(int ki = 0; ki < 5; ki++){ kp = abs(kp) - 0.73; kp = rot2(1.67) * kp; kp *= 1.33; }
    v = sin(kp.x * 3.87 - t * 4.84 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.49 + 0.25 * pow(abs(cos(ra * 6.0 + t * 0.87)), 1.30);
    v = sin((rr - pet) * 9.44 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.08;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 1.92 * p.y + time * 0.82); p.y += 0.50 / wf * cos(wf * 3.09 * p.x + time * 1.47); }
	p.x += sin(p.y * 6.98 + time * 3.30) * 0.39;
	{ float fr = length(p); p *= 1.0 + 0.36 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.21);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.53 + time * 0.30, vec3(0.44, 0.53, 0.44), vec3(0.44, 0.47, 0.45), vec3(0.96, 0.88, 1.33), vec3(0.97, 0.27, 0.98));
	col = mod(col * 2.69, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
