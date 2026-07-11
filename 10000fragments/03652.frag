uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.46) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.78 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.91;
	p = rot2(time * -0.87) * p;
	for(int wi = 0; wi < 3; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 1.88 * p.y + time * 1.13); p.y += 0.49 / wf * cos(wf * 2.35 * p.x + time * 1.47); }
	p = rot2(length(p) * -2.61 + time * 0.25) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.22), field(p, time, 0.44));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.83 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
