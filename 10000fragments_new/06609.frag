uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.38 + 0.34 * pow(abs(cos(ra * 2.0 + t * 0.60)), 2.55);
    v = sin((rr - pet) * 20.09 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.11) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 1.66 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	vec2 q1 = p; vec2 q2 = p;
	q1 = rot2(time * 0.74) * q1;
	q2.y += sin(q2.x * 5.96 + time * 3.70) * 0.10;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 2.00);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.82 + time * 0.15, vec3(0.45, 0.53, 0.46), vec3(0.32, 0.31, 0.32), vec3(0.75, 0.99, 1.07), vec3(0.48, 0.69, 0.11));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.35 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
