uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.21 + sin(p.y * 5.51 + t * 4.64) * 4.95 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float ra = atan(p.y, p.x); float rr = length(p);
    float pet = 0.32 + 0.29 * pow(abs(cos(ra * 3.0 + t * 2.99)), 2.35);
    v = sin((rr - pet) * 17.53 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.74;
	p = rot2(time * -1.08) * p;
	p *= 2.92;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.47);
	float d = d1 * d2;
	vec3 col = palette(d * 1.03 + time * 0.02, vec3(0.50, 0.53, 0.45), vec3(0.42, 0.33, 0.33), vec3(1.19, 0.86, 1.32), vec3(0.14, 0.87, 0.85));
	col = clamp((col - 0.5) * 1.33 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
