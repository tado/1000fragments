uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.74 + jf * 4.0), cos(t * 0.19 * jf)) * 0.75;
        xs += sin(length(p - im) * 147.15 - t * 5.27 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.82;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.42, lr * 1.99 + time * -0.74); }
	p += vec2(0.07, -0.27) * sin(length(p) * 5.96 - time * 1.90) * 0.18;
	p = rot2(p.y * -2.11 + time * 0.55) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.33), field(p, time, 2.66));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.85);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
