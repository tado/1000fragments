uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.22, 0.0)) * 19.84 - t * 6.29 + ph);
    float mb = sin(length(p + vec2(0.22, 0.0)) * 18.99 - t * 6.29 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 2.44 * p.y + time * 1.90); p.y += 0.28 / wf * cos(wf * 3.33 * p.x + time * 1.48); }
	{ p = vec2(atan(p.y, p.x) * 1.74, length(p) * 2.74 - time * 0.18); }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.24, lr * 1.99 + time * -0.17); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.33, 0.24, 0.49), vec3(0.60, 0.70, 0.87), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
