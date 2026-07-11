uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.21, 0.0)) * 31.33 - t * 2.80 + ph);
    float mb = sin(length(p + vec2(0.21, 0.0)) * 26.23 - t * 2.84 + ph);
    v = ma * mb;
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 5.48 + t * 0.76 + ph) * 0.7;
    float wb = sin(p.y * 16.56 - t * 1.77 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.76;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 4; fo++){ q1 = abs(q1) - 0.43; q1 = rot2(0.53) * q1; }
	q2.x += sin(q2.y * 7.10 + time * 2.19) * 0.19;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.32);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.91));
	vec3 col = palette(d * 1.02 + time * 0.31, vec3(0.50, 0.42, 0.41), vec3(0.40, 0.32, 0.48), vec3(1.31, 1.38, 1.34), vec3(0.61, 0.65, 0.21));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.20 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
