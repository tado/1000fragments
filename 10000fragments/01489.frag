uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 24.36 + sin(p.y * 4.40 + t * 1.18) * 4.13 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.02) * p * 10.32;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = palette(d * 0.52 + time * 0.25, vec3(0.45, 0.52, 0.48), vec3(0.31, 0.41, 0.33), vec3(0.99, 0.71, 0.91), vec3(0.31, 0.37, 0.22)) * v;
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.07 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
