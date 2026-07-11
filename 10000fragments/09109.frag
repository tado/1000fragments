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
    for(int xi = 1; xi < 6; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.37 + jf * 4.0), cos(t * 0.40 * jf)) * 0.91;
        xs += sin(length(p - im) * 103.58 - t * 8.16 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.43, lr * 1.81 + time * -0.28); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.56; p = rot2(2.49) * p; }
	p = rot2(time * 1.11) * p;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.54 + time * 0.15);
	col = fract(col * 2.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
