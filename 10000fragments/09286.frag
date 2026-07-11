uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.52 + jf * 4.0), cos(t * 0.16 * jf)) * 0.96;
        xs += sin(length(p - im) * 79.60 - t * 5.63 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.63;
	p *= 1.79;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.10; p = rot2(1.86) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.76, lr * 1.04 + time * 0.26); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.74), field(p, time, 1.48));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.85 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
