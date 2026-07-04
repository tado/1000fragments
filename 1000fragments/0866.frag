uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ma = sin(length(p - vec2(0.30, 0.0)) * 18.55 - t * 5.37 + ph);
    float mb = sin(length(p + vec2(0.30, 0.0)) * 13.16 - t * 6.96 + ph);
    v = ma * mb;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.91;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.54) * p * 9.22;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.57;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 1.30 + time * 0.21, vec3(0.55, 0.57, 0.43), vec3(0.34, 0.31, 0.42), vec3(0.75, 0.95, 0.82), vec3(0.85, 0.63, 0.45)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
