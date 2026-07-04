uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 2.10;
    v = 0.5 * (sin(1.0 * cp.x + t * 1.51) * sin(5.0 * cp.y + ph)
             + sin(5.0 * cp.x - t * 0.70) * sin(1.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.59;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.36) * p * 21.70;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = palette(d * 1.20 + time * 0.05, vec3(0.51, 0.41, 0.47), vec3(0.42, 0.42, 0.35), vec3(0.72, 0.77, 0.92), vec3(0.75, 0.94, 0.64)) * v;
	col *= 0.87 + 0.14 * sin(gl_FragCoord.y * 2.89 + time * 10.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
