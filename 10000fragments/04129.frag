uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.36 + sr * 6.88 - t * 3.58 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.67) - 0.5;
    float rad = 0.34 + 0.12 * sin(t * 0.63 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.98;
	vec2 q1 = p; vec2 q2 = p;
	q1 = vec2(q1.x * q1.x - q1.y * q1.y, 2.0 * q1.x * q1.y) * 0.77;
	q2 = fract(q2 * 2.22) - 0.5;
	q2 += vec2(-0.71, -0.45) * sin(length(q2) * 2.05 - time * 1.71) * 0.39;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.44);
	float d = d1 * d2;
	vec3 col = palette(d * 1.11 + time * 0.39, vec3(0.55, 0.54, 0.55), vec3(0.42, 0.48, 0.40), vec3(0.72, 0.92, 0.76), vec3(0.25, 0.28, 0.94));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
