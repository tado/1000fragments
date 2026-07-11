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
        vec2 im = vec2(sin(t * 0.93 + jf * 4.0), cos(t * 0.23 * jf)) * 0.56;
        xs += sin(length(p - im) * 98.68 - t * 11.67 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.55;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.10, lr * 1.92 + time * -0.43); }
	{ p = vec2(atan(p.y, p.x) * 2.96, length(p) * 5.02 - time * 0.57); }
	p = rot2(p.y * 1.18 + time * 0.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.94 + time * 0.23, vec3(0.41, 0.45, 0.45), vec3(0.36, 0.37, 0.46), vec3(1.35, 0.95, 1.21), vec3(0.29, 0.30, 0.69));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
