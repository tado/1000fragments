uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 6.02 + t * 4.68 + ph) + sin(p.y * 2.12 - t * 4.36 + ph));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.52, 0.0)) * 35.96 - t * 7.13 + ph);
    float mb = sin(length(p + vec2(0.52, 0.0)) * 14.01 - t * 7.13 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 2.74, length(p) * 3.64 - time * 0.55); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.34);
	float d = d1 + d2;
	vec3 col = palette(d * 1.49 + time * 0.03, vec3(0.60, 0.50, 0.40), vec3(0.35, 0.38, 0.41), vec3(1.17, 1.32, 0.79), vec3(0.78, 0.13, 0.39));
	col = mod(col * 2.64, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
