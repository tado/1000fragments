uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 6.39 + vec2(t * 1.02, -t * 1.03) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.88 + sin(p.y * 2.47 + t * 4.73) * 3.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 1.79;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.74);
	float d = d1 * d2;
	vec3 col = palette(d * 1.72 + time * 0.18, vec3(0.45, 0.44, 0.55), vec3(0.49, 0.39, 0.35), vec3(0.75, 0.82, 0.88), vec3(0.91, 0.57, 0.31));
	col = clamp((col - 0.5) * 1.75 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
