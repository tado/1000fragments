uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 12.0 + qr * 3.23 * sin(t * 1.32) + t * 2.54 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float wa = sin(p.x * 17.42 + t * 2.24 + ph) * 0.7;
    float wb = sin(p.y * 16.62 - t * 1.57 + ph) * 0.7;
    v = max(wa, wb) + min(wa, wb) * 0.52;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.89;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q2 = abs(q2) - 0.22; q2 = rot2(1.33) * q2; }
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 1.13);
	float d = min(d1, d2);
	vec3 col = palette(d * 0.78 + time * 0.08, vec3(0.60, 0.59, 0.45), vec3(0.50, 0.48, 0.44), vec3(1.33, 1.17, 1.21), vec3(0.38, 0.83, 0.37));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
