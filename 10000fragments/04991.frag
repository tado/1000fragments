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
        vec2 im = vec2(sin(t * 0.63 + jf * 4.0), cos(t * 0.38 * jf)) * 0.42;
        xs += sin(length(p - im) * 160.85 - t * 9.15 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 15.49 + vec2(t * 2.26, -t * 2.26) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.86;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.26, lr * 1.90 + time * -0.63); }
	p = rot2(time * 0.46) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.20);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.99 + time * 0.11, vec3(0.59, 0.51, 0.56), vec3(0.33, 0.32, 0.47), vec3(1.19, 0.77, 1.36), vec3(0.17, 0.61, 0.74));
	col = clamp((col - 0.5) * 1.92 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
