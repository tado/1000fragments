uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.85);
}

float field(vec2 p, float t, float ph){
    float v;
    float qa = atan(p.y, p.x);
    float qr = length(p);
    v = sin(qa * 7.0 + qr * 7.23 * sin(t * 0.52) + t * 4.19 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.25;
	p.x = abs(p.x) - 0.37;
	p *= 2.07;
	float d = 0.5 + 0.5 * field(p, (time * 0.56), 0.0);
	vec2 hq = rot2(0.48) * p * 15.70;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.68;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = palette(d * 0.52 + (time * 0.56) * 0.12, vec3(0.48, 0.52, 0.48), vec3(0.19, 0.20, 0.17), vec3(0.52, 0.46, 0.57), vec3(0.08, 0.53, 0.86)) * v;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.25);
	col = clamp(col, 0.0, 1.0) * vec3(0.958, 1.008, 0.949) * 1.00 + 0.048;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
