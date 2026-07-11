uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.03) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 3.51 + time * 0.23) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.37 / wf * sin(wf * 3.86 * p.y + time * 1.18); p.y += 0.20 / wf * cos(wf * 3.62 * p.x + time * 1.05); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.46), field(p, time, 0.91));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
