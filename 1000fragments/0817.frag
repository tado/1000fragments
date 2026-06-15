uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 13.45 + vec2(t * 1.32, -t * 1.32) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 15.59 + sin(p.y * 5.70 + t * 1.40) * 4.48 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.36;
	p = rot2(length(p) * -1.87 + time * 0.84) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.61);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 1.32 + time * 0.15, vec3(0.41, 0.52, 0.55), vec3(0.41, 0.47, 0.39), vec3(0.86, 1.02, 1.11), vec3(0.42, 0.66, 0.20));
	col = fract(col * 1.97);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
