uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 4.55 + t * 1.14 + ph) + sin(p.y * 11.62 - t * 3.26 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.84 + vec2(t * 0.58, -t * 1.16) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.19;
	vec2 q1 = p; vec2 q2 = p;
	q1 *= 1.0 + 0.18 * sin(time * 2.51);
	q1 = sin(q1 * 1.08 + time * 1.27) * 0.74;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.02);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.62 + time * 0.38, vec3(0.53, 0.50, 0.48), vec3(0.35, 0.41, 0.36), vec3(1.31, 1.05, 0.76), vec3(0.63, 0.32, 0.37));
	col = clamp((col - 0.5) * 1.29 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
