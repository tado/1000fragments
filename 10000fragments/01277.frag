uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 11.81 + t * 1.51 + ph) + sin(p.y * 10.13 - t * 1.51 + ph)
        + sin((p.x + p.y) * 9.86 + t * 1.51 + ph) + sin(length(p) * 13.30 - t * 1.51 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.44 + 0.27 * cos(sa * 6 + t * 1.15 + ph);
    v = sin((sr - petal) * 11.61);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.68);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.68 + time * 0.00, vec3(0.60, 0.46, 0.44), vec3(0.40, 0.36, 0.39), vec3(1.05, 1.16, 1.05), vec3(0.63, 0.09, 0.92));
	col = mod(col * 1.94, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
