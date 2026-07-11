uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.01 + sin(p.y * 2.47 + t * 3.64) * 1.06 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.47) - 0.5;
    float rad = 0.26 + 0.12 * sin(t * 3.61 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.07;
	vec2 q1 = p; vec2 q2 = p;
	q1 = fract(q1 * 1.45) - 0.5;
	q1 *= 1.82;
	{ float ka = atan(q2.y, q2.x); float kr = length(q2); float kn = 5.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); q2 = kr * vec2(cos(ka), sin(ka)); }
	q2 = fract(q2 * 2.20) - 0.5;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.96);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.44 + time * 0.22, vec3(0.53, 0.48, 0.58), vec3(0.30, 0.41, 0.36), vec3(0.81, 0.88, 0.90), vec3(0.70, 0.30, 0.97));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
