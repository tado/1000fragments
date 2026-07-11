uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.57 + 0.23 * cos(sa * 4 + t * 2.94 + ph);
    v = sin((sr - petal) * 15.16);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.45 + sin(p.y * 3.21 + t * 5.37) * 4.94 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 3.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p += vec2(-0.15, 0.87) * sin(length(p) * 2.06 - time * 1.37) * 0.22;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.78);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.28 + time * 0.02, vec3(0.56, 0.54, 0.57), vec3(0.39, 0.38, 0.47), vec3(0.73, 1.34, 1.06), vec3(0.28, 0.05, 0.85));
	col = clamp((col - 0.5) * 1.39 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
