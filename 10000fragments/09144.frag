uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.72 + jf * 4.0), cos(t * 0.38 * jf)) * 0.82;
        xs += sin(length(p - im) * 80.91 - t * 5.73 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.02;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.14; p = rot2(0.35) * p; }
	p = fract(p * 1.64) - 0.5;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.64, lr * 1.95 + time * -0.11); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.69 + time * 0.28);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
