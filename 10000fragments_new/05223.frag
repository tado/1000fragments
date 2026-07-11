uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.58 + vec2(t * 1.14, -t * 2.74) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.94;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 3.41 * p.y + time * 1.92); p.y += 0.48 / wf * cos(wf * 2.71 * p.x + time * 1.30); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.19, 0.14, 0.39), vec3(0.58, 0.99, 0.84), d);
	col *= 0.83 + 0.11 * sin(gl_FragCoord.y * 2.34 + time * 17.42);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
