uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.59, 0.0)) * 29.44 - t * 5.83 + ph);
    float mb = sin(length(p + vec2(0.59, 0.0)) * 25.58 - t * 5.83 + ph);
    v = ma * mb;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 7.29 + sin(p.y * 3.97 + t * 3.41) * 3.38 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.59 * fr * fr; }
	p = rot2(length(p) * -3.59 + time * 0.92) * p;
	p = rot2(1.54) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.25);
	float d = abs(d1 - d2);
	vec3 col = palette(d * 1.11 + time * 0.25, vec3(0.47, 0.53, 0.42), vec3(0.32, 0.38, 0.31), vec3(1.25, 1.21, 0.86), vec3(0.28, 0.97, 0.05));
	col = mod(col * 2.28, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
