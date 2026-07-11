uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.55 + jf * 4.0), cos(t * 0.16 * jf)) * 0.42;
        xs += sin(length(p - im) * 196.22 - t * 13.84 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	for(int wi = 0; wi < 5; wi++){ float wf = float(wi) + 1.0; p.x += 0.31 / wf * sin(wf * 2.55 * p.y + time * 0.63); p.y += 0.23 / wf * cos(wf * 2.41 * p.x + time * 0.62); }
	{ p = vec2(atan(p.y, p.x) * 1.64, length(p) * 2.02 - time * 0.11); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.23), field(p, time, 2.45));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
