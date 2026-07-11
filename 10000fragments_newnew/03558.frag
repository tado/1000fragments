uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 pk = p * 4.76;
    pk.x += step(0.5, fract(pk.y * 0.5)) * 0.5;
    vec2 pf = fract(pk) - 0.5;
    float rad = 0.30 + 0.14 * sin(t * 2.38 + floor(pk.y) * 1.7 + ph);
    v = (1.0 - smoothstep(rad - 0.1, rad, length(pf))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.65 - t * 1.24;
    v = sin(floor(lv * 6.0) / 6.0 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	{ float fr = length(q1); q1 *= 1.0 + -0.29 * fr * fr; }
	q1 += vec2(0.07, -0.24) * sin(length(q1) * 2.42 - time * 2.15) * 0.21;
	q2 = vec2(q2.x * q2.x - q2.y * q2.y, 2.0 * q2.x * q2.y) * 0.56;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.98);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.46 + time * 0.02, vec3(0.50, 0.50, 0.56), vec3(0.37, 0.44, 0.46), vec3(1.10, 1.18, 1.39), vec3(0.83, 0.42, 0.34));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
