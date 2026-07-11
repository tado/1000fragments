uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 2.95 + sr * 10.60 - t * 3.37 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.32, 0.0)) * 29.42 - t * 4.84 + ph);
    float mb = sin(length(p + vec2(0.32, 0.0)) * 21.01 - t * 1.34 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.83;
	{ p = vec2(atan(p.y, p.x) * 2.16, length(p) * 2.14 - time * 0.35); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.99);
	float d = min(d1, d2);
	vec3 col = palette(d * 1.77 + time * 0.24, vec3(0.44, 0.59, 0.42), vec3(0.43, 0.44, 0.48), vec3(1.34, 1.10, 1.31), vec3(0.65, 0.61, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
