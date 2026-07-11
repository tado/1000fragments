uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.14 * cos(sa * 3 + t * 0.32 + ph);
    v = sin((sr - petal) * 16.58);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.13;
	{ p = vec2(atan(p.y, p.x) * 2.69, length(p) * 5.69 - time * 0.63); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.19, vec3(0.46, 0.50, 0.45), vec3(0.35, 0.32, 0.34), vec3(1.03, 0.72, 1.18), vec3(0.18, 0.50, 0.26));
	col = clamp((col - 0.5) * 1.41 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
