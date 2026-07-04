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
    v = sin(sa * 6.73 + sr * 11.73 - t * 3.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.14) * p * 22.52;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.74;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = palette(d * 1.13 + time * 0.12, vec3(0.50, 0.55, 0.51), vec3(0.35, 0.48, 0.35), vec3(1.01, 0.97, 0.71), vec3(0.62, 0.53, 0.56)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
