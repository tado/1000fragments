uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 8; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.82 + jf * 4.0), cos(t * 0.33 * jf)) * 0.68;
        xs += sin(length(p - im) * 119.17 - t * 8.12 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.77;
	{ p = vec2(atan(p.y, p.x) * 1.72, length(p) * 2.40 - time * 0.33); }
	p = rot2(2.42) * p;
	p = abs(p) - 0.60;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.77, lr * 1.40 + time * -0.12); }
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.24, 1.12, 1.50) + vec3(0.22, 0.10, 0.19);
	col = fract(col * 2.30);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
