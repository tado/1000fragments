uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.27, t * 2.18 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.44 / wf * sin(wf * 3.06 * p.y + time * 1.35); p.y += 0.44 / wf * cos(wf * 3.42 * p.x + time * 1.56); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.48; p = rot2(0.54) * p; }
	p = rot2(0.76) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.47), field(p, time, 0.94));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
