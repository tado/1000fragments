uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.24 * cos(sa * 4 + t * 1.51 + ph);
    v = sin((sr - petal) * 14.87);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float xs = 0.0;
    for(int xi = 1; xi < 9; xi++){ float jf = float(xi);
        vec2 im = vec2(sin(t * 0.57 + jf * 4.0), cos(t * 0.17 * jf)) * 0.39;
        xs += sin(length(p - im) * 84.52 - t * 6.43 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.54;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.55, lr * 1.69 + time * 0.49); }
	p = rot2(length(p) * -2.99 + time * 0.86) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.12; p = rot2(0.96) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.06);
	float d = d1 * d2;
	vec3 col = palette(d * 1.46 + time * 0.07, vec3(0.45, 0.51, 0.40), vec3(0.37, 0.37, 0.32), vec3(1.14, 0.84, 1.09), vec3(0.77, 0.20, 0.83));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
