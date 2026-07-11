uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.58 + 0.21 * cos(sa * 8 + t * 2.29 + ph);
    v = sin((sr - petal) * 10.60);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.40, 0.0)) * 36.48 - t * 5.84 + ph);
    float mb = sin(length(p + vec2(0.40, 0.0)) * 34.30 - t * 5.84 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.75 * fr * fr; }
	p = rot2(2.72) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.53; p = rot2(1.55) * p; }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.23);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 0.74 + time * 0.08, vec3(0.49, 0.50, 0.60), vec3(0.44, 0.40, 0.32), vec3(0.97, 1.23, 1.00), vec3(0.48, 0.90, 0.41));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
