uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.68 + sin(p.y * 2.59 + t * 1.33) * 3.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	p = rot2(time * 0.71) * p;
	p = rot2(length(p) * 1.41 + time * 0.27) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.78 * p.y + time * 1.53); p.y += 0.39 / wf * cos(wf * 2.64 * p.x + time * 2.00); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.30; p = rot2(0.91) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.54));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
