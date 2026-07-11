uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.58, 0.0)) * 20.08 - t * 3.61 + ph);
    float mb = sin(length(p + vec2(0.58, 0.0)) * 28.78 - t * 3.61 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.16;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.51; p = rot2(1.87) * p; }
	p = rot2(time * 0.92) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.27, vec3(0.48, 0.47, 0.44), vec3(0.42, 0.47, 0.49), vec3(1.17, 0.99, 0.72), vec3(0.80, 0.19, 0.50));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
