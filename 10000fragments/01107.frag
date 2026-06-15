uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.18 * cos(sa * 6 + t * 1.53 + ph);
    v = sin((sr - petal) * 19.46);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.49;
	{ p = vec2(atan(p.y, p.x) * 1.34, length(p) * 5.74 - time * 0.78); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.98 + time * 0.18, vec3(0.43, 0.52, 0.59), vec3(0.47, 0.39, 0.38), vec3(0.83, 0.86, 1.22), vec3(0.89, 0.94, 0.67));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
