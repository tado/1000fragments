uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 19.65 + sin(p.y * 5.07 + t * 2.50) * 2.17 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.71 * p.y + time * 0.90); p.y += 0.37 / wf * cos(wf * 3.76 * p.x + time * 1.05); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.65 + time * 0.30, vec3(0.57, 0.55, 0.58), vec3(0.32, 0.33, 0.37), vec3(1.11, 1.03, 0.74), vec3(0.96, 0.85, 0.61));
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
