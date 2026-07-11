uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.41, 0.0)) * 16.25 - t * 3.82 + ph);
    float mb = sin(length(p + vec2(0.41, 0.0)) * 11.44 - t * 3.82 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.29;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 2.78 * p.y + time * 1.88); p.y += 0.40 / wf * cos(wf * 2.10 * p.x + time * 1.34); }
	{ float fr = length(p); p *= 1.0 + -0.42 * fr * fr; }
	p = rot2(p.y * -3.94 + time * 0.80) * p;
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.65));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
