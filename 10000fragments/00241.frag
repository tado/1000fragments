uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.26, t * 1.05 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 4.0 + qr * 4.15 * sin(t * 1.17) + t * 3.83 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.47; p = rot2(0.74) * p; }
	p += vec2(-0.35, 0.18) * sin(length(p) * 5.82 - time * 1.56) * 0.31;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.61);
	float d = d1 + d2;
	vec3 col = palette(d * 1.50 + time * 0.08, vec3(0.52, 0.45, 0.59), vec3(0.31, 0.47, 0.48), vec3(0.79, 1.39, 1.32), vec3(0.57, 0.72, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
