uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 7; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.85 + jf * 4.0), cos(t * 0.22 * jf)) * 0.92;
        xs += sin(length(p - im) * 113.02 - t * 10.29 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + -0.72 * fr * fr; }
	p += vec2(0.71, -0.61) * sin(length(p) * 3.27 - time * 2.12) * 0.38;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.42, lr * 2.11 + time * -0.66); }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.02, 0.26, 0.59), vec3(0.91, 0.91, 0.92), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
