uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.23 * cos(sa * 8 + t * 0.62 + ph);
    v = sin((sr - petal) * 14.58);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.93;
	{ float fr = length(p); p *= 1.0 + -0.68 * fr * fr; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.33, lr * 2.92 + time * 0.24); }
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.59 + time * 0.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
