uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.17 + jf * 4.0), cos(t * 0.17 * jf)) * 0.36;
        xs += sin(length(p - im) * 118.13 - t * 12.50 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = abs(p);
	for(int wi = 0; wi < 6; wi++){ float wf = float(wi) + 1.0; p.x += 0.49 / wf * sin(wf * 3.46 * p.y + time * 1.02); p.y += 0.26 / wf * cos(wf * 2.43 * p.x + time * 1.84); }
	p = fract(p * 2.49) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.06), field(p, time, 2.11));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.17);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
