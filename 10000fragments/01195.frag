uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.82 + t * 3.39 + ph) + sin(p.y * 7.78 - t * 3.39 + ph)
        + sin((p.x + p.y) * 9.24 + t * 3.39 + ph) + sin(length(p) * 6.17 - t * 3.39 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.14 * cos(sa * 5 + t * 2.21 + ph);
    v = sin((sr - petal) * 15.26);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.66;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.43);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.64 + time * 0.23, vec3(0.52, 0.49, 0.49), vec3(0.38, 0.43, 0.35), vec3(0.74, 1.04, 0.99), vec3(0.95, 0.33, 0.47));
	col = mod(col * 2.96, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
