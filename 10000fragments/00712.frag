uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.51 + sin(p.y * 4.62 + t * 3.22) * 2.10 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.30;
	{ float fr = length(p); p *= 1.0 + -0.27 * fr * fr; }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.62 + time * 0.18, vec3(0.47, 0.43, 0.54), vec3(0.46, 0.44, 0.42), vec3(0.72, 0.82, 1.20), vec3(0.26, 0.66, 0.61));
	col = fract(col * 2.06);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
