uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 9.0 + qr * 7.82 * sin(t * 1.01) + t * 5.26 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.93;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.23) * p * 11.93;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.70;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 1.36 + time * 0.19, vec3(0.43, 0.41, 0.56), vec3(0.48, 0.39, 0.48), vec3(0.92, 1.10, 0.94), vec3(0.27, 0.10, 0.83)) * v;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
