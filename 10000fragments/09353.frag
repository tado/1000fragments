uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.90 + jf * 4.0), cos(t * 0.32 * jf)) * 0.35;
        xs += sin(length(p - im) * 131.22 - t * 10.68 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.80;
	p += vec2(-0.66, -0.05) * sin(length(p) * 2.25 - time * 0.98) * 0.32;
	{ float fr = length(p); p *= 1.0 + 0.31 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.85, lr * 1.49 + time * 0.47); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.25), field(p, time, 2.51));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.84);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
