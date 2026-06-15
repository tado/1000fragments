uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 16.57 - t * 4.46 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.28;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.26 * p.y + time * 1.35); p.y += 0.48 / wf * cos(wf * 3.94 * p.x + time * 0.85); }
	p += vec2(-0.42, 0.77) * sin(length(p) * 3.01 - time * 1.61) * 0.27;
	{ float fr = length(p); p *= 1.0 + -0.30 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.32 + time * 0.07);
	col = clamp((col - 0.5) * 1.46 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
