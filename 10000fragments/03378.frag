uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.96 + jf * 4.0), cos(t * 0.46 * jf)) * 0.75;
        xs += sin(length(p - im) * 175.66 - t * 5.36 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.84;
	p = rot2(time * -0.62) * p;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.40 / wf * sin(wf * 2.83 * p.y + time * 1.80); p.y += 0.43 / wf * cos(wf * 3.45 * p.x + time * 1.62); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.73), field(p, time, 1.46));
	col = 0.5 + 0.5 * col;
	col = mod(col * 1.37, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
