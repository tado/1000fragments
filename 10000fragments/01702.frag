uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 16.61 + sin(p.y * 4.08 + t * 3.46) * 3.68 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.78;
	{ float fr = length(p); p *= 1.0 + 0.28 * fr * fr; }
	p = rot2(time * -0.91) * p;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.11; p = rot2(1.54) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.18 + time * 0.01, vec3(0.43, 0.56, 0.56), vec3(0.31, 0.37, 0.37), vec3(1.05, 0.95, 1.19), vec3(0.99, 0.86, 0.51));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
