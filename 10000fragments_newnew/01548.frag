uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.62 + t * 1.25) - 0.5) * 2.0;
    v = sin((p.y * 2.42 + zx * 1.43 + t * 1.74) * 3.1415927 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.79;
    v = 0.5 * (sin(5.0 * cp.x + t * 1.83) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 1.63) * sin(5.0 * cp.y + ph));
    return v;
}
float fieldC(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 3.95 + t * 0.94) - 0.5) * 2.0;
    v = sin((p.y * 6.77 + zx * 0.54 + t * 2.47) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.89;
	vec2 q1 = p; vec2 q2 = p; vec2 q3 = p;
	q2.y += sin(q2.x * 6.44 + time * 1.66) * 0.26;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 8.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.39);
	float d3 = fieldC(q3, time, 1.70);
	d2 = d2 * d3;
	float d = min(d1, d2);
	vec3 col = palette(d * 0.42 + time * 0.05, vec3(0.46, 0.41, 0.56), vec3(0.43, 0.35, 0.44), vec3(0.77, 0.92, 0.92), vec3(0.44, 0.21, 0.44));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.06;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
