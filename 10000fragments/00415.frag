uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 11.40 + t * 2.17 + ph) + sin(p.y * 3.57 - t * 5.93 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.60 * p.y + time * 0.69); p.y += 0.28 / wf * cos(wf * 2.43 * p.x + time * 0.69); }
	p *= 1.99;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.46, 0.21), vec3(0.70, 0.90, 0.86), d);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.22));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
