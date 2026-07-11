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
        vec2 im = vec2(sin(t * 0.63 + jf * 4.0), cos(t * 0.28 * jf)) * 0.39;
        xs += sin(length(p - im) * 120.45 - t * 6.36 + ph) * 0.5; }
    v = xs / (1.0 + abs(xs));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.20 * cos(sa * 8 + t * 2.37 + ph);
    v = sin((sr - petal) * 7.62);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.78;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.10; p = rot2(2.50) * p; }
	{ float fr = length(p); p *= 1.0 + -0.35 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.74);
	float d = d1 * d2;
	vec3 col = palette(d * 0.92 + time * 0.26, vec3(0.51, 0.44, 0.43), vec3(0.45, 0.33, 0.37), vec3(0.86, 1.06, 0.94), vec3(0.95, 0.77, 0.92));
	col = fract(col * 1.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
