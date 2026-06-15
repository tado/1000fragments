uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.06) - 0.5;
    float rad = 0.20 + 0.12 * sin(t * 3.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	p *= 1.50;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.34 / wf * sin(wf * 3.40 * p.y + time * 0.62); p.y += 0.28 / wf * cos(wf * 1.68 * p.x + time * 1.90); }
	p = fract(p * 1.17) - 0.5;
	p = rot2(time * -1.13) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.53), field(p, time, 1.05));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
