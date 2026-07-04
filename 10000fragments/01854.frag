uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 7.20 + t * 4.72 + ph) + sin(p.y * 13.95 - t * 4.72 + ph)
        + sin((p.x + p.y) * 8.07 + t * 4.72 + ph) + sin(length(p) * 12.13 - t * 4.72 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.95) * p * 16.43;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.66;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = palette(d * 0.85 + time * 0.02, vec3(0.42, 0.51, 0.42), vec3(0.41, 0.35, 0.39), vec3(0.73, 0.83, 1.39), vec3(0.78, 0.47, 0.33)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
