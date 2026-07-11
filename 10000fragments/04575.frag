uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.46, 0.0)) * 14.08 - t * 4.74 + ph);
    float mb = sin(length(p + vec2(0.46, 0.0)) * 24.37 - t * 4.74 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.13;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.63 * p.y + time * 1.54); p.y += 0.36 / wf * cos(wf * 3.73 * p.x + time * 1.29); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.84, 1.41, 0.87) + vec3(0.04, 0.06, 0.09);
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
