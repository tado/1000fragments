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
    float petal = 0.57 + 0.17 * cos(sa * 8 + t * 0.79 + ph);
    v = sin((sr - petal) * 14.53);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	p += vec2(-0.45, 0.37) * sin(length(p) * 4.72 - time * 1.30) * 0.29;
	p = rot2(length(p) * 1.05 + time * 0.37) * p;
	p = rot2(p.y * -1.47 + time * 0.14) * p;
	{ p = vec2(atan(p.y, p.x) * 2.73, length(p) * 4.08 - time * 0.59); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.60 + time * 0.08, vec3(0.57, 0.42, 0.44), vec3(0.49, 0.47, 0.33), vec3(1.35, 1.17, 1.28), vec3(0.87, 0.87, 0.41));
	col = floor(clamp(col, 0.0, 1.0) * 3.0) / 3.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
