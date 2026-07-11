uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.39 + 0.24 * cos(sa * 7 + t * 1.22 + ph);
    v = sin((sr - petal) * 9.56);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.63;
	p = abs(p);
	{ p = vec2(atan(p.y, p.x) * 2.29, length(p) * 4.15 - time * 0.64); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.49 + time * 0.05, vec3(0.42, 0.57, 0.59), vec3(0.44, 0.34, 0.31), vec3(0.85, 0.83, 0.76), vec3(0.85, 0.13, 0.54));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
