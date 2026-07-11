uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.22 + jf * 4.0), cos(t * 0.24 * jf)) * 0.72;
        xs += sin(length(p - im) * 91.39 - t * 4.93 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.66, lr * 1.52 + time * -0.72); }
	{ float fr = length(p); p *= 1.0 + -0.47 * fr * fr; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.00, 0.49, 0.05), vec3(0.68, 0.76, 0.88), d);
	col = fract(col * 1.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
