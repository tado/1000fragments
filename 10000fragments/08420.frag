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
    float petal = 0.44 + 0.21 * cos(sa * 6.0 + t * 1.81 + ph);
    v = sin((sr - petal) * 17.04);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.25) * p * 9.07;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.50;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.79 + time * 0.23, vec3(0.52, 0.52, 0.45), vec3(0.44, 0.36, 0.46), vec3(1.17, 0.83, 0.83), vec3(0.25, 0.86, 0.09)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
