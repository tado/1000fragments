uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 8.02 + sin(p.y * 1.40 + t * 4.41) * 1.27 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.54 + 0.16 * cos(sa * 9 + t * 1.17 + ph);
    v = sin((sr - petal) * 8.48);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.06, lr * 1.96 + time * -0.27); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.71);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.95 + time * 0.17, vec3(0.46, 0.44, 0.55), vec3(0.40, 0.49, 0.45), vec3(1.03, 1.35, 0.80), vec3(0.49, 0.63, 0.86));
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
