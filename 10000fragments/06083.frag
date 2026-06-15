uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.42 + t * 5.79 + ph) + sin(p.y * 10.39 - t * 3.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	p += vec2(-0.36, -0.36) * sin(length(p) * 5.93 - time * 1.34) * 0.23;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.31 * p.y + time * 1.20); p.y += 0.35 / wf * cos(wf * 2.72 * p.x + time * 1.25); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.11, 0.07, 0.44), vec3(0.59, 0.86, 0.96), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
