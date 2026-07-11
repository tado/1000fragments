uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 z = p * 0.68; vec2 jc = vec2(0.13 + 0.3 * sin(t * 1.10 + ph), 0.19 + 0.3 * cos(t * 1.10 + ph));
    float jit = 0.0;
    for(int ji = 0; ji < 31; ji++){ z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + jc; if(dot(z, z) > 4.0) break; jit += 1.0; }
    v = jit / float(31) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.66;
	{ float fr = length(p); p *= 1.0 + -0.79 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.31; p = rot2(2.15) * p; }
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.25 / wf * sin(wf * 2.46 * p.y + time * 0.62); p.y += 0.25 / wf * cos(wf * 2.44 * p.x + time * 1.47); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.82), field(p, time, 1.64));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
