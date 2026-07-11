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
    for(int xi = 1; xi < 5; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.34 + jf * 4.0), cos(t * 0.49 * jf)) * 0.34;
        xs += sin(length(p - im) * 198.90 - t * 8.64 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.81 + sr * 12.82 - t * 1.08 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	p = rot2(1.14) * p;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.47, lr * 2.14 + time * -0.63); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.12);
	float d = d1 + d2;
	vec3 col = palette(d * 1.55 + time * 0.22, vec3(0.55, 0.42, 0.42), vec3(0.31, 0.45, 0.35), vec3(0.98, 1.31, 0.91), vec3(0.32, 0.67, 0.42));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
