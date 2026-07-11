uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.80, t * 1.18 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * -0.89) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.45 / wf * sin(wf * 2.09 * p.y + time * 1.38); p.y += 0.23 / wf * cos(wf * 3.72 * p.x + time * 0.95); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.22; p = rot2(1.72) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.31), field(p, time, 0.63));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.61 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
