uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.92;
    v = 0.5 * (sin(1.0 * cp.x + t * 2.95) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 0.54) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, (time * 0.80), 0.0);
	vec2 hq = rot2(0.62) * p * 22.69;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.55;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = palette(d * 1.24 + (time * 0.80) * 0.11, vec3(0.47, 0.53, 0.45), vec3(0.25, 0.24, 0.30), vec3(0.50, 0.45, 0.56), vec3(0.80, 0.34, 0.35)) * v;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.80)) * 100.0) - 0.5) * 0.10;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.53);
	col = clamp(col, 0.0, 1.0) * vec3(0.913, 0.997, 1.030) * 1.00 + 0.035;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
