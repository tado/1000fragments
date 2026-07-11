uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.22, t * 2.13 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.75;
	p = rot2(1.07) * p;
	p += vec2(-0.44, 0.10) * sin(length(p) * 4.79 - time * 2.37) * 0.23;
	{ p = vec2(atan(p.y, p.x) * 2.27, length(p) * 3.93 - time * 0.90); }
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 3.65 * p.y + time * 1.32); p.y += 0.46 / wf * cos(wf * 1.90 * p.x + time * 0.80); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.11));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.53);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
