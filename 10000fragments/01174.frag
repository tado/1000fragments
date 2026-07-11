uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.15 + t * 0.76 + ph) + sin(p.y * 11.77 - t * 0.76 + ph)
        + sin((p.x + p.y) * 2.57 + t * 0.76 + ph) + sin(length(p) * 3.17 - t * 0.76 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.37; p = rot2(0.75) * p; }
	p = rot2(0.89) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.36 / wf * sin(wf * 3.72 * p.y + time * 1.96); p.y += 0.32 / wf * cos(wf * 2.59 * p.x + time * 1.54); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.36), field(p, time, 0.72));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
