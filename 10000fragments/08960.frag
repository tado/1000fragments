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
    v = sin(sa * 4.08 + sr * 12.89 - t * 2.20 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.05;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.27) * p * 12.74;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 1.05 + time * 0.28, vec3(0.55, 0.43, 0.51), vec3(0.37, 0.48, 0.33), vec3(0.93, 1.08, 1.02), vec3(0.99, 0.66, 0.42)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
