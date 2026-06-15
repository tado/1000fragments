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
    float petal = 0.40 + 0.14 * cos(sa * 3 + t * 2.66 + ph);
    v = sin((sr - petal) * 15.38);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.44;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.39; p = rot2(1.98) * p; }
	p += vec2(0.13, -0.26) * sin(length(p) * 5.02 - time * 1.23) * 0.13;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.91, lr * 1.91 + time * -0.40); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.02, vec3(0.56, 0.53, 0.58), vec3(0.34, 0.45, 0.48), vec3(1.29, 1.04, 0.89), vec3(0.98, 0.64, 0.34));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.80));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
