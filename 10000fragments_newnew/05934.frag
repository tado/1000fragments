uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.36 - t * 5.52 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.18;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.21 / wf * sin(wf * 2.46 * p.y + time * 0.95); p.y += 0.40 / wf * cos(wf * 3.30 * p.x + time * 2.03); }
	{ float fr = length(p); p *= 1.0 + -0.34 * fr * fr; }
	p = rot2(p.y * 1.97 + time * 1.09) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.58), field(p, time, 1.16));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
