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
        vec2 im = vec2(sin(t * 0.76 + jf * 4.0), cos(t * 0.26 * jf)) * 0.97;
        xs += sin(length(p - im) * 61.82 - t * 4.35 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(p.y * 2.29 + time * 0.83) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.41, lr * 2.89 + time * 0.52); }
	{ p = vec2(atan(p.y, p.x) * 2.11, length(p) * 4.77 - time * 0.70); }
	{ float fr = length(p); p *= 1.0 + 0.36 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.23, vec3(0.55, 0.52, 0.48), vec3(0.38, 0.40, 0.42), vec3(0.76, 1.16, 1.21), vec3(0.59, 0.90, 0.02));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
