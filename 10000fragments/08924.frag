uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.40) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 3.99 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 5.26 + sr * 8.82 - t * 4.86 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.05;
	p = rot2(time * 0.77) * p;
	p = rot2(length(p) * 3.37 + time * 0.95) * p;
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 0.31);
	float d = mix(d1, d2, 0.5 + 0.5 * sin(time * 0.5));
	vec3 col = palette(d * 0.94 + time * 0.08, vec3(0.43, 0.51, 0.46), vec3(0.43, 0.50, 0.46), vec3(0.77, 1.38, 1.01), vec3(0.12, 0.60, 0.17));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
