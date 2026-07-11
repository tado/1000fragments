uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 37.89 - t * 3.96 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.64;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.29; p = rot2(1.34) * p; }
	p += vec2(0.90, 0.95) * sin(length(p) * 5.23 - time * 1.30) * 0.23;
	p = abs(p) - 0.44;
	{ float fr = length(p); p *= 1.0 + 0.50 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.87 + time * 0.18, vec3(0.53, 0.57, 0.44), vec3(0.45, 0.34, 0.39), vec3(1.10, 1.32, 0.82), vec3(0.07, 1.00, 0.13));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
