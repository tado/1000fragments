uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.36 + jf * 4.0), cos(t * 0.25 * jf)) * 0.94;
        xs += sin(length(p - im) * 91.75 - t * 7.98 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.54, 0.99) * sin(length(p) * 4.25 - time * 2.13) * 0.20;
	p = abs(p) - 0.43;
	for(int wi = 0; wi < 4; wi++){ float wf = float(wi) + 1.0; p.x += 0.23 / wf * sin(wf * 2.58 * p.y + time * 1.24); p.y += 0.44 / wf * cos(wf * 2.12 * p.x + time * 1.02); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.83));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
