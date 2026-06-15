uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 22.40 + sin(p.y * 2.04 + t * 5.37) * 1.00 + ph);
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 3.16 + sr * 11.83 - t * 0.75 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = fract(p * 2.85) - 0.5;
	p = rot2(time * 1.22) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.15);
	float d = d1 + d2;
	vec3 col = palette(d * 1.04 + time * 0.12, vec3(0.46, 0.55, 0.54), vec3(0.46, 0.48, 0.37), vec3(0.95, 0.76, 1.24), vec3(0.17, 0.74, 0.54));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.57));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
