uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.00;
    v = 0.5 * (sin(4.0 * cp.x + t * 1.17) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 0.64) * sin(4.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.32;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.89) * p * 23.23;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.20, length(hf));
	vec3 col = palette(d * 0.62 + time * 0.29, vec3(0.46, 0.41, 0.44), vec3(0.34, 0.37, 0.38), vec3(1.18, 1.19, 1.14), vec3(0.31, 0.11, 0.32)) * v;
	col = fract(col * 2.31);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
