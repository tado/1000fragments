uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.54 + t * 3.86 + ph) + sin(p.y * 7.83 - t * 4.47 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.01;
	p = (floor(p * 10.9) + 0.5) / 10.9;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.87));
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 3.36 * p.y + time * 0.70); p.y += 0.41 / wf * cos(wf * 1.90 * p.x + time * 1.26); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.90, 0.70, 0.16) * (0.07 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
