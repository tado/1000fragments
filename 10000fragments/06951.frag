uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.85, t * 2.04 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	p = rot2(p.y * -2.92 + time * 0.63) * p;
	{ p = vec2(atan(p.y, p.x) * 2.92, length(p) * 2.30 - time * 0.12); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.88 * p.y + time * 1.55); p.y += 0.21 / wf * cos(wf * 3.27 * p.x + time * 1.72); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.75));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.54);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
