uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.66 + t * 1.31 + ph) + sin(p.y * 12.72 - t * 4.69 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 26.61 - t * 3.61 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + -0.61 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.04);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.78 + time * 0.14, vec3(0.55, 0.41, 0.56), vec3(0.49, 0.31, 0.45), vec3(1.09, 1.35, 0.95), vec3(0.75, 0.77, 0.14));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
