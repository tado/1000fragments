uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.17 + jf * 4.0), cos(t * 0.11 * jf)) * 0.87;
        xs += sin(length(p - im) * 84.24 - t * 9.52 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.91;
	p = abs(p);
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.35 / wf * sin(wf * 1.70 * p.y + time * 1.02); p.y += 0.27 / wf * cos(wf * 1.82 * p.x + time * 1.37); }
	p = rot2(0.38) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.31), field(p, time, 0.62));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.55);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
