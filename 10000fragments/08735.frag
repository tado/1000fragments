uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.66 + 0.19 * cos(sa * 9 + t * 2.41 + ph);
    v = sin((sr - petal) * 6.72);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.69;
	p *= 1.64;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.28, vec3(0.41, 0.51, 0.45), vec3(0.49, 0.33, 0.34), vec3(0.84, 0.95, 1.09), vec3(0.29, 0.18, 0.59));
	col = fract(col * 1.77);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
