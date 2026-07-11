uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.45;
    for(int ki = 0; ki < 6; ki++){ kp = abs(kp) - 0.66; kp = rot2(1.15) * kp; kp *= 1.18; }
    v = sin(kp.y * 2.79 - t * 2.58 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.73;
	p = abs(p) - 0.63;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.52; p = rot2(1.73) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.61, length(p) * 4.67 - time * 0.61); }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 3.11 * p.y + time * 1.82); p.y += 0.44 / wf * cos(wf * 3.77 * p.x + time * 1.83); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.87, 0.54, 0.47) * (0.13 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.32 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
