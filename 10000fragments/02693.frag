uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.42 + 0.11 * cos(sa * 3 + t * 1.78 + ph);
    v = sin((sr - petal) * 18.59);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.97;
	p *= 2.36;
	p = abs(p) - 0.73;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.08, vec3(0.52, 0.54, 0.49), vec3(0.35, 0.43, 0.38), vec3(0.91, 1.12, 1.05), vec3(0.19, 0.53, 0.86));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
