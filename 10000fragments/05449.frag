uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 14.15 + sin(p.y * 2.56 + t * 1.71) * 1.93 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.35; p = rot2(2.47) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.88 + time * 0.20, vec3(0.48, 0.44, 0.47), vec3(0.41, 0.44, 0.50), vec3(1.39, 1.00, 1.33), vec3(0.74, 0.74, 0.10));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
