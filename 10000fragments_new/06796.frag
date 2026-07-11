uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 14.10 - t * 2.95 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 38.67 - t * 2.36 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.30; p = rot2(0.58) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.61, length(p) * 3.99 - time * 0.97); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.28 / wf * sin(wf * 2.02 * p.y + time * 1.39); p.y += 0.44 / wf * cos(wf * 3.81 * p.x + time * 1.91); }
	p = rot2(time * 1.07) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.35), field(p, time, 0.70));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
