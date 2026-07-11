uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cp = p * 1.25;
    v = 0.5 * (sin(3.0 * cp.x + t * 1.91) * sin(6.0 * cp.y + ph)
             + sin(6.0 * cp.x - t * 2.36) * sin(3.0 * cp.y + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 0.98;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.38) * p * 21.39;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.65;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = palette(d * 0.81 + time * 0.11, vec3(0.47, 0.50, 0.42), vec3(0.42, 0.46, 0.40), vec3(0.89, 0.96, 1.22), vec3(0.89, 0.69, 0.66)) * v;
	col = floor(clamp(col, 0.0, 1.0) * 6.0) / 6.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
