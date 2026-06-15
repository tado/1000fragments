uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.50 + t * 2.90 + ph) + sin(p.y * 7.89 - t * 2.90 + ph)
        + sin((p.x + p.y) * 8.16 + t * 2.90 + ph) + sin(length(p) * 13.40 - t * 2.90 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(1.88) * p;
	p = fract(p * 1.55) - 0.5;
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.22 * p.y + time * 1.61); p.y += 0.28 / wf * cos(wf * 2.15 * p.x + time * 0.83); }
	p *= 1.74;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.88), field(p, time, 1.75));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
