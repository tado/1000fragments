uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.83 + vec2(t * 2.34, -t * 2.34) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	p = rot2(p.y * -2.83 + time * 0.32) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 1.64 * p.y + time * 1.70); p.y += 0.31 / wf * cos(wf * 3.39 * p.x + time * 0.70); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.44; p = rot2(2.39) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.36));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
