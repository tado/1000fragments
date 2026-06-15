uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.33, 0.0)) * 20.87 - t * 1.16 + ph);
    float mb = sin(length(p + vec2(0.33, 0.0)) * 39.77 - t * 1.16 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 31.57 - t * 6.03 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.40 * fr * fr; }
	p = rot2(time * 0.27) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.21; p = rot2(0.83) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.27);
	float d = max(d1, d2);
	vec3 col = palette(d * 0.98 + time * 0.27, vec3(0.46, 0.45, 0.53), vec3(0.32, 0.44, 0.36), vec3(1.29, 0.99, 1.35), vec3(0.89, 0.41, 0.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
