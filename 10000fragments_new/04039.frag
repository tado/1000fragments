uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 7.51, t * 1.72 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.39; p = rot2(2.34) * p; }
	p = rot2(2.86) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.04 + time * 0.29, vec3(0.50, 0.58, 0.42), vec3(0.33, 0.41, 0.36), vec3(1.10, 0.88, 1.16), vec3(0.22, 0.05, 0.64));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
