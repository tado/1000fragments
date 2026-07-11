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
    v = sin(sa * 4.59 + sr * 6.18 - t * 0.91 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.91;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.18) * p * 14.63;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = palette(d * 0.53 + time * 0.24, vec3(0.43, 0.56, 0.40), vec3(0.34, 0.36, 0.43), vec3(0.87, 0.73, 0.97), vec3(0.38, 0.32, 0.95)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
