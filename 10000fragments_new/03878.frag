uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.32 + t * 4.86 + ph) + sin(p.y * 6.77 - t * 3.39 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.27 / wf * sin(wf * 2.32 * p.y + time * 0.78); p.y += 0.39 / wf * cos(wf * 3.60 * p.x + time * 2.02); }
	p = fract(p * 1.08) - 0.5;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.30; p = rot2(2.25) * p; }
	float d = field(p, time, 0.0);
	vec3 col = vec3(1.00, 0.89, 0.61) * (0.22 / (abs(d) + 0.05));
	col = col / (1.0 + col);
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
