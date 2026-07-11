uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.45, t * 0.82 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.39; p = rot2(2.52) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.90 + time * 0.24, vec3(0.50, 0.47, 0.42), vec3(0.41, 0.33, 0.39), vec3(1.01, 1.04, 1.40), vec3(0.38, 0.96, 0.40));
	col = mod(col * 2.14, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
