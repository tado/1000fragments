uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.17 * jf)) * 0.60;
        xs += sin(length(p - im) * 189.51 - t * 11.47 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.83;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.88;
	p = abs(p) - 0.56;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.43, lr * 1.22 + time * 0.93); }
	p *= 1.92;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.21, 0.01, 0.58), vec3(0.96, 0.75, 0.80), d);
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.43 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
