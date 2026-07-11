uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.64 + 0.17 * cos(sa * 6.0 + t * 1.41 + ph);
    v = sin((sr - petal) * 17.13);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.16;
	p *= 1.66;
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.57, lr * 2.08 + time * 0.53); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.05, vec3(0.41, 0.44, 0.47), vec3(0.36, 0.31, 0.35), vec3(0.74, 0.72, 1.32), vec3(0.21, 0.90, 0.61));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.49 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
