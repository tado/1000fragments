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
    float pet = 0.57 + 0.17 * pow(abs(cos(ra * 2.0 + t * 1.78)), 1.64);
    v = sin((rr - pet) * 17.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.93;
	p = fract(p * 2.99) - 0.5;
	p = rot2(p.y * 1.75 + time * 0.96) * p;
	p = rot2(1.48) * p;
	p.x += sin(p.y * 6.36 + time * 2.40) * 0.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.88 + time * 0.01, vec3(0.44, 0.42, 0.51), vec3(0.45, 0.33, 0.45), vec3(1.24, 0.82, 0.95), vec3(0.67, 0.45, 0.74));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.88));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
