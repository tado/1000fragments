uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.49 + sin(p.y * 4.71 + t * 1.60) * 3.50 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.11 + vec2(t * 0.97, -t * 0.97) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * 2.03 + time * 0.39) * p;
	{ p = vec2(atan(p.y, p.x) * 1.27, length(p) * 5.21 - time * 0.74); }
	p += vec2(-0.92, -0.36) * sin(length(p) * 4.01 - time * 1.21) * 0.35;
	p = rot2(2.09) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.84);
	float d = d1 + d2;
	vec3 col = palette(d * 1.05 + time * 0.17, vec3(0.54, 0.43, 0.46), vec3(0.34, 0.48, 0.41), vec3(1.30, 1.37, 1.07), vec3(0.90, 0.90, 0.97));
	col = mod(col * 1.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
