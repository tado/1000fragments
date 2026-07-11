uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 5.17 + vec2(t * 2.77, -t * 0.87) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.95 + t * 5.57 + ph) + sin(p.y * 2.11 - t * 4.96 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.05);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.27 + time * 0.07, vec3(0.43, 0.50, 0.51), vec3(0.36, 0.33, 0.44), vec3(1.02, 1.31, 0.93), vec3(0.29, 0.16, 0.41));
	col = mod(col * 2.22, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
