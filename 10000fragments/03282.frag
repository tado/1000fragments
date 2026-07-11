uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.27) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 3.77 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    v = sin(sa * 4.71 + sr * 14.84 - t * 0.64 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 3.36;
	p = rot2(time * -0.92) * p;
	{ p = vec2(atan(p.y, p.x) * 1.42, length(p) * 2.60 - time * 0.36); }
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.94);
	float d = d1 * d2;
	vec3 col = palette(d * 0.81 + time * 0.06, vec3(0.41, 0.50, 0.58), vec3(0.30, 0.40, 0.43), vec3(0.89, 0.75, 1.19), vec3(0.18, 0.04, 0.12));
	col = mod(col * 1.95, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
