uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 21.43 + sin(p.y * 1.30 + t * 3.70) * 2.82 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 15.47 + t * 2.30 + ph) * 0.7;
    float wb = sin(p.y * 17.92 - t * 3.33 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.23;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	vec2 q1 = p; vec2 q2 = p;
	q1 = mix(q1, q1.yx, 0.5 + 0.5 * sin(time * 2.30));
	q2 = rot2(2.56) * q2;
	{ float fr = length(q2); q2 *= 1.0 + 0.22 * fr * fr; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.75);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.09 + time * 0.35, vec3(0.59, 0.53, 0.45), vec3(0.41, 0.46, 0.33), vec3(1.20, 1.15, 1.14), vec3(0.55, 0.54, 0.11));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
