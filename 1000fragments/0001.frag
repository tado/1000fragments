uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float fieldA(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.53 + sr * 22.85 - t * 2.37 + ph);
    return v;
}
float fieldB(vec2 p, float t, float ph){
    float v;
    float ga = atan(p.y, p.x); float gr = length(p) + 0.001;
    float arm = sin(log(gr) * 6.81 + ga * 2.0 - t * 1.78 + ph);
    v = arm * exp(-gr * 0.58);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	vec2 q1 = p; vec2 q2 = p;
	for(int fo = 0; fo < 5; fo++){ q1 = abs(q1) - 0.52; q1 = rot2(2.49) * q1; }
	q2 = rot2(time * 0.74) * q2;
	float d1 = fieldA(q1, time, 0.0);
	float d2 = fieldB(q2, time, 0.51);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.90 + time * 0.34, vec3(0.60, 0.54, 0.49), vec3(0.49, 0.35, 0.40), vec3(1.21, 1.12, 0.80), vec3(0.49, 0.18, 0.55));
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
