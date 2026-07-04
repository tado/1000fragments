uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.49 + 0.22 * cos(sa * 9.0 + t * 2.95 + ph);
    v = sin((sr - petal) * 8.89);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.08;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.84 + time * 0.26, vec3(0.45, 0.41, 0.51), vec3(0.48, 0.38, 0.41), vec3(0.97, 0.85, 0.82), vec3(0.79, 0.85, 0.58));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
