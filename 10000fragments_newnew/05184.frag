uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.12 + t * 1.18) - 0.5) * 2.0;
    v = sin((p.y * 2.91 + zx * 1.04 + t * 2.99) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.40;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.29) * p * 20.62;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = palette(d * 1.34 + time * 0.24, vec3(0.48, 0.56, 0.45), vec3(0.49, 0.35, 0.46), vec3(0.97, 0.95, 1.25), vec3(0.69, 0.17, 0.60)) * v;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.24));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
