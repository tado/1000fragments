uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float sa = atan(p.y, p.x); float sr = length(p);
    float petal = 0.35 + 0.29 * cos(sa * 3.0 + t * 2.23 + ph);
    v = sin((sr - petal) * 6.87);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, (time * 0.64), 0.0);
	vec2 hq = rot2(0.30) * p * 15.98;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 0.56 + (time * 0.64) * 0.09, vec3(0.33, 0.29, 0.34), vec3(0.13, 0.13, 0.17), vec3(0.61, 0.85, 0.45), vec3(0.93, 0.03, 0.25)) * v;
	col *= 0.87 + 0.19 * sin(gl_FragCoord.y * 2.73 + (time * 0.64) * 9.10);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.38);
	col = clamp(col, 0.0, 1.0) * vec3(0.932, 0.967, 1.034) * 1.00 + 0.046;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
