uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.49 + jf * 4.0), cos(t * 0.54 * jf)) * 0.77;
        xs += sin(length(p - im) * 167.55 - t * 8.86 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.57;
	p = rot2(2.08) * p;
	p = abs(p);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.39 / wf * sin(wf * 4.00 * p.y + time * 1.66); p.y += 0.43 / wf * cos(wf * 2.10 * p.x + time * 1.64); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.14), field(p, time, 2.28));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(0.71));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
