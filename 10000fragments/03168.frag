uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.03 + sin(p.y * 5.58 + t * 2.76) * 3.79 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p += vec2(0.85, -0.19) * sin(length(p) * 2.80 - time * 1.65) * 0.37;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.43 / wf * sin(wf * 1.94 * p.y + time * 1.34); p.y += 0.45 / wf * cos(wf * 1.76 * p.x + time * 0.61); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.94, 0.55, 1.59) + vec3(0.03, 0.24, 0.14);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.91));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
