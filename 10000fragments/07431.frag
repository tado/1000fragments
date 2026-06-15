uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.26, 0.0)) * 39.49 - t * 2.08 + ph);
    float mb = sin(length(p + vec2(0.26, 0.0)) * 35.15 - t * 2.08 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.21;
	p = rot2(p.y * -1.19 + time * 0.36) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.38; p = rot2(0.77) * p; }
	{ float lr = log(length(p) + 0.001); float la = atan(p.y, p.x); p = vec2(la * 1.61, lr * 1.78 + time * -0.78); }
	p = rot2(length(p) * -1.94 + time * 0.48) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.83 + time * 0.20, vec3(0.47, 0.42, 0.44), vec3(0.40, 0.35, 0.38), vec3(1.32, 1.33, 1.21), vec3(0.33, 0.42, 0.44));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
