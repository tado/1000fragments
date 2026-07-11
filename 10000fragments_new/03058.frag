uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 4; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.84 + jf * 4.0), cos(t * 0.43 * jf)) * 0.77;
        xs += sin(length(p - im) * 209.96 - t * 9.48 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.95, lr * 2.41 + time * 0.87); }
	p = abs(p);
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.27; p = rot2(1.85) * p; }
	p = rot2(1.58) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.68 + time * 0.26, vec3(0.56, 0.59, 0.40), vec3(0.41, 0.50, 0.42), vec3(0.85, 0.80, 0.80), vec3(0.03, 0.44, 0.62));
	col = clamp((col - 0.5) * 1.38 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
