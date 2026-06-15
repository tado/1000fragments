uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.52 + 0.17 * cos(sa * 6 + t * 2.63 + ph);
    v = sin((sr - petal) * 18.36);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.42;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.13 + time * 0.03, vec3(0.56, 0.51, 0.57), vec3(0.45, 0.32, 0.40), vec3(1.21, 1.28, 1.09), vec3(0.04, 1.00, 0.73));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.54));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
