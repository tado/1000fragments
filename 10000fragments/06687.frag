uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.02, t * 0.51 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 13.16 + t * 4.53 + ph) + sin(p.y * 7.00 - t * 4.53 + ph)
        + sin((p.x + p.y) * 11.07 + t * 4.53 + ph) + sin(length(p) * 17.79 - t * 4.53 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 6.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.04);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.57 + time * 0.15, vec3(0.40, 0.55, 0.50), vec3(0.36, 0.36, 0.36), vec3(0.88, 1.00, 0.89), vec3(0.71, 0.46, 0.89));
	col = mod(col * 1.92, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
