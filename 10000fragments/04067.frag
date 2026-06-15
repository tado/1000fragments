uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 9.84 - t * 4.45 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 36.98 - t * 4.45 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.29 / wf * sin(wf * 1.68 * p.y + time * 1.65); p.y += 0.22 / wf * cos(wf * 2.46 * p.x + time * 1.86); }
	p = rot2(length(p) * -1.61 + time * 0.28) * p;
	{ p = vec2(atan(p.y, p.x) * 1.51, length(p) * 4.73 - time * 0.33); }
	p += vec2(-0.32, 0.01) * sin(length(p) * 4.71 - time * 0.53) * 0.30;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.29, 1.10, 1.30) + vec3(0.14, 0.06, 0.15);
	col = fract(col * 1.82);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
