uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.35 - t * 8.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.39;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.22 / wf * sin(wf * 1.97 * p.y + time * 1.18); p.y += 0.24 / wf * cos(wf * 3.46 * p.x + time * 0.85); }
	p.y += sin(p.x * 7.92 + time * 2.35) * 0.26;
	p = abs(p) - 0.50;
	{ float fr = length(p); p *= 1.0 + 0.44 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.29, 0.45, 0.30) * (0.21 / (abs(d) + 0.03));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
