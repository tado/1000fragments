uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 22.33 - t * 8.78 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.82;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.98 * p.y + time * 1.81); p.y += 0.25 / wf * cos(wf * 2.82 * p.x + time * 1.80); }
	{ p = vec2(atan(p.y, p.x) * 2.71, length(p) * 3.59 - time * 0.38); }
	p += vec2(0.05, -0.46) * sin(length(p) * 4.76 - time * 1.53) * 0.38;
	p = abs(p);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.24, 0.06, 0.49), vec3(0.53, 0.95, 0.49), d);
	col = clamp((col - 0.5) * 1.64 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
