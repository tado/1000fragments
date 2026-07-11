uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.02 + sin(p.y * 3.21 + t * 2.14) * 3.36 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.50;
	{ float fr = length(p); p *= 1.0 + -0.57 * fr * fr; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.42 / wf * sin(wf * 3.25 * p.y + time * 0.66); p.y += 0.24 / wf * cos(wf * 2.96 * p.x + time * 1.97); }
	p = abs(p) - 0.31;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.09, vec3(0.46, 0.58, 0.40), vec3(0.36, 0.43, 0.38), vec3(1.07, 1.00, 1.04), vec3(0.85, 0.80, 0.38));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
