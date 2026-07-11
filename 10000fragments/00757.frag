uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.82 + sin(p.y * 1.51 + t * 4.83) * 4.72 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(1.18) * p;
	p += vec2(-0.73, -0.78) * sin(length(p) * 4.24 - time * 1.02) * 0.36;
	p = fract(p * 1.87) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.34 + time * 0.06, vec3(0.50, 0.48, 0.53), vec3(0.42, 0.33, 0.44), vec3(1.15, 0.99, 1.09), vec3(0.76, 0.98, 0.14));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
