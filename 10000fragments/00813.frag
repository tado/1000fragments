uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.34, t * 2.10 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.76;
	{ p = vec2(atan(p.y, p.x) * 1.56, length(p) * 3.97 - time * 0.47); }
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.47; p = rot2(0.64) * p; }
	{ float fr = length(p); p *= 1.0 + -0.58 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.70 + time * 0.11, vec3(0.57, 0.48, 0.57), vec3(0.45, 0.41, 0.44), vec3(1.09, 1.07, 0.90), vec3(0.24, 0.44, 0.35));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
