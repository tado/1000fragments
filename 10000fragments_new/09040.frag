uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.63 + 0.15 * cos(sa * 7.0 + t * 2.16 + ph);
    v = sin((sr - petal) * 6.50);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.48) - 0.5;
    float rad = 0.31 + 0.12 * sin(t * 3.55 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.32) * q1;
	q2 *= 1.30;
	q2 = rot2(time * 0.82) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.97);
	float d = min(d1, d2);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.02, 0.54, 1.50) + vec3(0.20, 0.01, 0.14);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
