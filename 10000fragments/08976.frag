uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.40 + jf * 4.0), cos(t * 0.14 * jf)) * 0.46;
        xs += sin(length(p - im) * 216.79 - t * 11.53 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.80;
	for(int wi = 0; wi < 2; wi++){ float wf = float(wi) + 1.0; p.x += 0.26 / wf * sin(wf * 1.63 * p.y + time * 1.63); p.y += 0.26 / wf * cos(wf * 2.80 * p.x + time * 1.55); }
	{ p = vec2(atan(p.y, p.x) * 1.73, length(p) * 3.89 - time * 0.33); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.49, 0.38, 0.03), vec3(0.80, 0.76, 0.48), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
