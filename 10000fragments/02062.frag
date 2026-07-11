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
    v = sin(sa * 4.32 + sr * 18.16 - t * 4.55 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.12;
	p = rot2(p.y * -3.36 + time * 0.85) * p;
	p *= 2.27;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.83 + time * 0.06, vec3(0.45, 0.51, 0.54), vec3(0.46, 0.46, 0.31), vec3(1.14, 1.15, 0.96), vec3(0.19, 0.03, 0.78));
	col = clamp((col - 0.5) * 2.07 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
