uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.42, t * 1.78 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.02;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 2.69 * p.y + time * 0.70); p.y += 0.25 / wf * cos(wf * 2.33 * p.x + time * 1.55); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.30; p = rot2(2.46) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.64));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.27, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
