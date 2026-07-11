uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.59 + 0.29 * cos(sa * 9 + t * 0.80 + ph);
    v = sin((sr - petal) * 13.00);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.98 + time * 0.01, vec3(0.49, 0.49, 0.56), vec3(0.37, 0.40, 0.31), vec3(0.93, 1.15, 1.12), vec3(0.77, 0.43, 0.03));
	col = clamp((col - 0.5) * 1.67 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
