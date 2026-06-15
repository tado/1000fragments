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
    float petal = 0.41 + 0.15 * cos(sa * 5 + t * 1.74 + ph);
    v = sin((sr - petal) * 16.46);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.06;
	p = fract(p * 2.50) - 0.5;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.56; p = rot2(1.60) * p; }
	p *= 2.83;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.36 + time * 0.02, vec3(0.43, 0.53, 0.58), vec3(0.48, 0.39, 0.36), vec3(0.75, 1.38, 0.70), vec3(0.71, 0.83, 0.22));
	col = pow(clamp(col, 0.0, 1.0), vec3(1.04));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
