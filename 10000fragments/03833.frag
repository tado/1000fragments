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
    float petal = 0.70 + 0.17 * cos(sa * 3 + t * 1.34 + ph);
    v = sin((sr - petal) * 10.89);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.23;
	p = rot2(p.y * -3.17 + time * 0.58) * p;
	p = fract(p * 1.89) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.78 + time * 0.15, vec3(0.42, 0.47, 0.42), vec3(0.42, 0.36, 0.43), vec3(1.05, 1.06, 1.06), vec3(0.16, 0.35, 0.05));
	col = mod(col * 2.91, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
