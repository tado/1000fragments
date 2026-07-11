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
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.18 + jf * 4.0), cos(t * 0.44 * jf)) * 0.79;
        xs += sin(length(p - im) * 202.91 - t * 4.19 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.56;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.72, lr * 1.48 + time * -0.44); }
	p = rot2(length(p) * 2.62 + time * 0.72) * p;
	{ p = vec2(atan(p.y, p.x) * 1.19, length(p) * 5.10 - time * 0.31); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.42 + time * 0.21, vec3(0.51, 0.44, 0.48), vec3(0.47, 0.32, 0.46), vec3(0.78, 0.92, 0.99), vec3(0.80, 0.33, 0.56));
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
