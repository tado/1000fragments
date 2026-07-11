uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 34.43 - t * 7.08 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 29.21 - t * 5.77 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 3.14 * p.y + time * 2.18); p.y += 0.41 / wf * cos(wf * 1.63 * p.x + time * 0.60); }
	{ p = vec2(atan(p.y, p.x) * 2.57, length(p) * 4.98 - time * 0.82); }
	p = rot2(time * 0.78) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.21, 0.50, 0.58) * (0.11 / (abs(d) + 0.06));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
