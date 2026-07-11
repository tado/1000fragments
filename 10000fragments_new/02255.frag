uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.56 + 0.13 * cos(sa * 9.0 + t * 1.57 + ph);
    v = sin((sr - petal) * 12.73);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.59;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.81, lr * 1.90 + time * 0.77); }
	p.y += sin(p.x * 4.40 + time * 2.75) * 0.18;
	p = abs(p) - 0.74;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 0.84 + time * 0.20);
	col = pow(clamp(col, 0.0, 1.0), vec3(1.62));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
