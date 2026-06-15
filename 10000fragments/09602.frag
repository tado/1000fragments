uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.78 + sin(p.y * 5.31 + t * 0.56) * 3.24 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.66;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 1.55 * p.y + time * 1.10); p.y += 0.46 / wf * cos(wf * 3.85 * p.x + time * 1.58); }
	p = rot2(time * -1.31) * p;
	p = rot2(p.y * 2.20 + time * 0.12) * p;
	{ p = vec2(atan(p.y, p.x) * 2.53, length(p) * 4.92 - time * 0.35); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.30), field(p, time, 2.59));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
