uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.24) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 1.00 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -1.53 + time * 0.22) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.33; p = rot2(2.17) * p; }
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.24 / wf * sin(wf * 2.51 * p.y + time * 2.00); p.y += 0.42 / wf * cos(wf * 2.30 * p.x + time * 1.87); }
	p = fract(p * 1.65) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.34), field(p, time, 0.67));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.59, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
