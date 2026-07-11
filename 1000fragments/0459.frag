uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 6.48 + sin(p.y * 4.38 + t * 5.67) * 1.83 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 4.15 + vec2(t * 2.52, -t * 2.52) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.74;
	p = rot2(time * 0.63) * p;
	p *= 3.16;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 2.00);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.69 + time * 0.18, vec3(0.57, 0.49, 0.57), vec3(0.37, 0.40, 0.42), vec3(1.03, 1.38, 0.82), vec3(0.13, 0.66, 0.63));
	col = mod(col * 2.78, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
