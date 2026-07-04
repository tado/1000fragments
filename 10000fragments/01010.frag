uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.10 + t * 2.12 + ph) + sin(p.y * 9.50 - t * 2.12 + ph)
        + sin((p.x + p.y) * 3.81 + t * 2.12 + ph) + sin(length(p) * 7.33 - t * 2.12 + ph));
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.77) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 3.52 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	vec2 q1 = p; vec2 q2 = p;
	{ float ka = atan(q1.y, q1.x); float kr = length(q1); float kn = 9.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q1 = kr * vec2(cos(ka), sin(ka)); }
	q2 = mix(q2, q2.yx, 0.5 + 0.5 * sin(time * 0.84));
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.84);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.62));
	vec3 col = palette(d * 1.16 + time * 0.08, vec3(0.60, 0.57, 0.55), vec3(0.33, 0.38, 0.45), vec3(1.12, 1.02, 1.05), vec3(0.81, 0.71, 0.63));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
