uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 18.25 - t * 4.76 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.46 + 0.19 * cos(sa * 4 + t * 1.31 + ph);
    v = sin((sr - petal) * 12.70);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.96, lr * 2.32 + time * 0.25); }
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.14; p = rot2(0.79) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.34);
	float d = d1 * d2;
	vec3 col = palette(d * 1.36 + time * 0.01, vec3(0.59, 0.49, 0.50), vec3(0.47, 0.34, 0.40), vec3(1.37, 1.08, 0.91), vec3(0.19, 0.66, 0.45));
	col = mod(col * 1.73, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
