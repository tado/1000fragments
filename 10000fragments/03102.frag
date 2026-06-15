uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.35, t * 2.47 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = abs(p) - 0.50;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.18; p = rot2(2.28) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.68 + time * 0.29, vec3(0.52, 0.43, 0.55), vec3(0.44, 0.37, 0.34), vec3(0.85, 0.91, 0.95), vec3(0.01, 0.14, 0.63));
	col = clamp((col - 0.5) * 1.89 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
