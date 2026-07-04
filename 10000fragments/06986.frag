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
    v = sin(sa * 7.46 + sr * 10.19 - t * 2.41 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.49;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.02) * p * 9.28;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.75;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.97 + time * 0.17, vec3(0.43, 0.42, 0.41), vec3(0.42, 0.46, 0.41), vec3(1.30, 0.95, 0.84), vec3(0.04, 0.19, 0.50)) * v;
	col = fract(col * 1.20);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
