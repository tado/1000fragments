uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.37 + 0.13 * cos(sa * 8 + t * 2.57 + ph);
    v = sin((sr - petal) * 14.20);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.44;
	p = fract(p * 1.95) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.66 + time * 0.10, vec3(0.42, 0.46, 0.42), vec3(0.40, 0.34, 0.45), vec3(1.19, 0.74, 1.07), vec3(0.69, 0.36, 0.09));
	col = fract(col * 1.87);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
