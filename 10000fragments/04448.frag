uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 10.05 - t * 5.69 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 14.89 - t * 7.19 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 38.48 - t * 7.19 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.25;
	p = rot2(p.y * 1.68 + time * 0.12) * p;
	p += vec2(-0.37, 0.25) * sin(length(p) * 5.80 - time * 1.76) * 0.35;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.59 * p.y + time * 1.23); p.y += 0.47 / wf * cos(wf * 3.54 * p.x + time * 1.91); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.10);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.24 + time * 0.02, vec3(0.54, 0.49, 0.42), vec3(0.49, 0.39, 0.41), vec3(0.88, 0.82, 1.00), vec3(0.98, 0.04, 0.31));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
