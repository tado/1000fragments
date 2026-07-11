uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.33) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 0.67 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.40 + t * 1.39 + ph) + sin(p.y * 2.39 - t * 1.39 + ph)
        + sin((p.x + p.y) * 5.17 + t * 1.39 + ph) + sin(length(p) * 3.00 - t * 1.39 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.55;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.52; q2 = rot2(2.58) * q2; }
	q2 = rot2(length(q2) * 2.69 + time * 0.96) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.89);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.77 + time * 0.25, vec3(0.57, 0.58, 0.50), vec3(0.44, 0.50, 0.34), vec3(1.06, 1.30, 1.18), vec3(0.42, 0.59, 0.75));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
