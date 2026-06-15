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
    float petal = 0.34 + 0.25 * cos(sa * 3 + t * 2.84 + ph);
    v = sin((sr - petal) * 8.37);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(p.y * -3.26 + time * 0.30) * p;
	p = rot2(time * 1.21) * p;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.21 + time * 0.06, vec3(0.46, 0.45, 0.58), vec3(0.34, 0.48, 0.33), vec3(0.70, 1.36, 0.70), vec3(0.28, 0.35, 0.81));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.81));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
