uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.41 + 0.16 * cos(sa * 3 + t * 2.46 + ph);
    v = sin((sr - petal) * 14.38);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.01, lr * 2.40 + time * 0.58); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.77 + time * 0.13, vec3(0.51, 0.52, 0.59), vec3(0.48, 0.40, 0.39), vec3(0.83, 1.35, 0.76), vec3(0.10, 0.57, 0.82));
	col = fract(col * 2.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
