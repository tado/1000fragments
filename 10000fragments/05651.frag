uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.71 + t * 0.72) - 0.5) * 2.0;
    v = sin((p.y * 7.09 + zx * 1.64 + t * 2.58) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.05;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.59) * p * 23.73;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.73, 0.83, 0.99), vec3(0.11, 0.14, 0.12), v);
	col = mod(col * 2.29, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
