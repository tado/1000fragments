uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.28) - 0.5;
    float rad = 0.37 + 0.12 * sin(t * 0.79 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 7.44 + vec2(t * 1.16, -t * 1.16) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.93;
	{ p = vec2(atan(p.y, p.x) * 1.92, length(p) * 2.11 - time * 0.59); }
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 7.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	{ float fr = length(p); p *= 1.0 + 0.57 * fr * fr; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.45);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.93 + time * 0.09, vec3(0.52, 0.46, 0.53), vec3(0.33, 0.41, 0.36), vec3(1.22, 1.10, 0.95), vec3(0.24, 0.53, 0.06));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
