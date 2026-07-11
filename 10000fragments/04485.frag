uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.34, 0.0)) * 31.68 - t * 2.87 + ph);
    float mb = sin(length(p + vec2(0.34, 0.0)) * 33.34 - t * 2.87 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	{ float fr = length(p); p *= 1.0 + 0.72 * fr * fr; }
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 1.99 * p.y + time * 1.84); p.y += 0.22 / wf * cos(wf * 1.62 * p.x + time * 1.02); }
	p = rot2(p.y * 2.17 + time * 0.23) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.55), field(p, time, 1.09));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
