uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 5.57, t * 2.03 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.23;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.32; p = rot2(1.73) * p; }
	p = rot2(length(p) * 3.21 + time * 0.82) * p;
	p = rot2(p.y * 2.92 + time * 0.87) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.08, vec3(0.49, 0.51, 0.51), vec3(0.39, 0.30, 0.46), vec3(0.92, 0.75, 1.06), vec3(0.73, 0.55, 0.76));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
