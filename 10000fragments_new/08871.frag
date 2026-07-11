uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 12.08 + vec2(t * 0.94, -t * 0.64) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 3.89 * p.y + time * 1.22); p.y += 0.22 / wf * cos(wf * 2.18 * p.x + time * 1.38); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.56; p = rot2(0.54) * p; }
	p = fract(p * 1.11) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.24, 0.70, 0.47) * (0.24 / (abs(d) + 0.10));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
