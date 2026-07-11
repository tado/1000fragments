uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.16 + jf * 4.0), cos(t * 0.53 * jf)) * 0.95;
        xs += sin(length(p - im) * 111.01 - t * 6.73 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.32;
	p = rot2(length(p) * 1.77 + time * 1.29) * p;
	p.y += sin(p.x * 2.31 + time * 1.40) * 0.15;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.48 / wf * sin(wf * 3.68 * p.y + time * 0.64); p.y += 0.46 / wf * cos(wf * 2.87 * p.x + time * 1.97); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.43), field(p, time, 0.85));
	col = 0.5 + 0.5 * col;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
