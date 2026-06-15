uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.05 - t * 7.90 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.76;
	p = fract(p * 1.98) - 0.5;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 1.85 * p.y + time * 0.74); p.y += 0.31 / wf * cos(wf * 1.62 * p.x + time * 0.61); }
	p += vec2(-0.85, 0.33) * sin(length(p) * 5.60 - time * 1.93) * 0.13;
	p *= 1.51;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.17, 1.29, 0.73) + vec3(0.20, 0.07, 0.27);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
