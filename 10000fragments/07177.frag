uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.75, t * 0.62 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 1.65 * p.y + time * 1.06); p.y += 0.31 / wf * cos(wf * 1.65 * p.x + time * 1.90); }
	p = rot2(time * -1.36) * p;
	p = rot2(1.26) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.22; p = rot2(1.15) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.77), field(p, time, 1.53));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
