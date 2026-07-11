uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 10.09 + sr * 22.66 - t * 3.98 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.31;
	p = sin(p * 1.31 + time * 1.78) * 0.90;
	p = rot2(time * -1.02) * p;
	p.x += sin(p.y * 7.14 + time * 3.83) * 0.29;
	p += vec2(0.21, -0.77) * sin(length(p) * 4.79 - time * 2.03) * 0.14;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.24, vec3(0.52, 0.43, 0.43), vec3(0.31, 0.32, 0.45), vec3(1.36, 1.37, 0.85), vec3(0.10, 0.40, 0.74));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
