uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.77 + t * 3.66 + ph) + sin(p.y * 8.09 - t * 3.62 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	p = fract(p * 1.25) - 0.5;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.23; p = rot2(0.59) * p; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.41 / wf * sin(wf * 2.27 * p.y + time * 1.44); p.y += 0.32 / wf * cos(wf * 3.08 * p.x + time * 0.90); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.52));
	col = 0.5 + 0.5 * col;
	col = fract(col * 2.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
