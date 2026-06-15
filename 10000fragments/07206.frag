uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 6.48, t * 2.01 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 7.00 + t * 1.50 + ph) + sin(p.y * 3.58 - t * 2.26 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(time * -0.74) * p;
	{ p = vec2(atan(p.y, p.x) * 1.57, length(p) * 2.23 - time * 0.65); }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.43; p = rot2(0.62) * p; }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.30);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.51 + time * 0.26, vec3(0.50, 0.51, 0.48), vec3(0.42, 0.32, 0.40), vec3(0.78, 1.21, 0.78), vec3(0.39, 0.06, 0.48));
	col = mod(col * 2.83, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
