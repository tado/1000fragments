uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.35 + 0.25 * pow(abs(cos(ra * 5.0 + t * 1.76)), 2.03);
    v = sin((rr - pet) * 21.67 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.71, 0.07) * sin(length(p) * 2.64 - time * 1.67) * 0.21;
	p = rot2(time * 1.03) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.26));
	{ p = vec2(atan(p.y, p.x) * 1.35, length(p) * 4.85 - time * 0.64); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.51 + time * 0.25, vec3(0.45, 0.51, 0.53), vec3(0.31, 0.46, 0.32), vec3(0.90, 1.12, 1.12), vec3(0.34, 0.11, 0.28));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
