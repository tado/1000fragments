uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 12.97 + sin(p.y * 1.82 + t * 5.09) * 4.16 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 0.87;
	p = rot2(time * 0.34) * p;
	p = fract(p * 2.17) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.43 + time * 0.11, vec3(0.57, 0.47, 0.54), vec3(0.49, 0.47, 0.46), vec3(0.70, 1.02, 1.06), vec3(0.40, 0.95, 0.08));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
