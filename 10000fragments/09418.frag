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
    float petal = 0.60 + 0.25 * cos(sa * 3 + t * 2.75 + ph);
    v = sin((sr - petal) * 14.16);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.97;
	p = rot2(p.y * -2.77 + time * 0.15) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.86 + time * 0.20, vec3(0.45, 0.48, 0.41), vec3(0.46, 0.38, 0.46), vec3(1.34, 0.78, 1.13), vec3(0.96, 0.44, 0.37));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.98));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
