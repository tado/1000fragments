uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 10.82 - t * 3.47 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 26.11 - t * 3.47 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = abs(p);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 1.99 * p.y + time * 1.78); p.y += 0.42 / wf * cos(wf * 3.38 * p.x + time * 1.80); }
	p = fract(p * 1.59) - 0.5;
	{ p = vec2(atan(p.y, p.x) * 1.30, length(p) * 2.90 - time * 0.46); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.14, 0.04, 0.07), vec3(0.91, 0.78, 0.86), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
