uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 10.40 + vec2(t * 1.80, -t * 2.04) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.93;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.30 / wf * sin(wf * 2.52 * p.y + time * 0.66); p.y += 0.45 / wf * cos(wf * 3.12 * p.x + time * 1.59); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.33; p = rot2(0.54) * p; }
	{ float fr = length(p); p *= 1.0 + -0.39 * fr * fr; }
	p += vec2(0.90, -0.57) * sin(length(p) * 2.69 - time * 1.07) * 0.20;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.68), field(p, time, 1.36));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
