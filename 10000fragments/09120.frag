uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 39.49 - t * 4.04 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 27.57 - t * 4.04 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.59 * fr * fr; }
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.52, length(p) * 5.12 - time * 0.10); }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.46 / wf * sin(wf * 1.74 * p.y + time * 1.70); p.y += 0.31 / wf * cos(wf * 1.99 * p.x + time * 0.98); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.68 + time * 0.03, vec3(0.56, 0.44, 0.47), vec3(0.40, 0.36, 0.45), vec3(1.35, 0.98, 1.14), vec3(0.19, 0.55, 0.80));
	col = fract(col * 1.83);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
