uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 3.96, t * 1.43 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.06;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.28; p = rot2(1.84) * p; }
	{ p = vec2(atan(p.y, p.x) * 2.80, length(p) * 5.97 - time * 0.73); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.39 + time * 0.14, vec3(0.59, 0.42, 0.54), vec3(0.42, 0.45, 0.35), vec3(1.14, 0.75, 1.39), vec3(0.35, 0.32, 0.28));
	col = mod(col * 1.60, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
