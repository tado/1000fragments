uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.39, 0.0)) * 8.34 - t * 4.21 + ph);
    float mb = sin(length(p + vec2(0.39, 0.0)) * 25.66 - t * 4.21 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.50 * p.y + time * 1.88); p.y += 0.49 / wf * cos(wf * 1.81 * p.x + time * 1.02); }
	p = fract(p * 1.16) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.50));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.36 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
