uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.12) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 1.93 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.98;
	p = rot2(p.y * -3.33 + time * 0.68) * p;
	p = rot2(2.17) * p;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.38 / wf * sin(wf * 2.14 * p.y + time * 1.79); p.y += 0.31 / wf * cos(wf * 2.50 * p.x + time * 1.73); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.33), field(p, time, 0.65));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
