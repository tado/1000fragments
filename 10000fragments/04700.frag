uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 12.29 - t * 1.39 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 28.82 - t * 1.39 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.88 - t * 7.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.26;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 2.21 * p.y + time * 0.92); p.y += 0.34 / wf * cos(wf * 3.65 * p.x + time * 1.24); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.90);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.74 + time * 0.26, vec3(0.46, 0.45, 0.51), vec3(0.47, 0.41, 0.37), vec3(0.91, 0.98, 1.36), vec3(0.77, 0.37, 0.07));
	col = mod(col * 1.25, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
