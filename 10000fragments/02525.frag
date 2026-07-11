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
    float petal = 0.40 + 0.14 * cos(sa * 9 + t * 1.16 + ph);
    v = sin((sr - petal) * 6.10);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.94;
	p = rot2(length(p) * 3.48 + time * 0.65) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.99 + time * 0.27, vec3(0.47, 0.56, 0.55), vec3(0.31, 0.32, 0.37), vec3(1.28, 0.90, 0.78), vec3(0.46, 0.87, 0.55));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
