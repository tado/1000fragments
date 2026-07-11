uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 11.83 + t * 1.27 + ph) * 0.7;
    float wb = sin(p.y * 6.76 - t * 2.16 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.40;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.42; p = rot2(1.35) * p; }
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.94 * p.y + time * 0.90); p.y += 0.43 / wf * cos(wf * 2.92 * p.x + time * 2.02); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.94, 0.99, 0.92) * (0.13 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	col = clamp((col - 0.5) * 1.64 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
