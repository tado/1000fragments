uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.29 * cos(sa * 3 + t * 2.32 + ph);
    v = sin((sr - petal) * 14.89);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.65;
	p *= 1.33;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 2.37, lr * 2.16 + time * -0.45); }
	{ p = vec2(atan(p.y, p.x) * 2.82, length(p) * 4.22 - time * 0.37); }
	p = fract(p * 1.11) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.23, vec3(0.53, 0.54, 0.51), vec3(0.49, 0.44, 0.46), vec3(1.37, 1.28, 1.28), vec3(0.67, 0.36, 0.16));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
