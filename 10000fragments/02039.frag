uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 4.96 + t * 1.27) - 0.5) * 2.0;
    v = sin((p.y * 7.23 + zx * 0.65 + t * 0.94) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.39;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.55) * p * 13.63;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.67;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.08, 0.01, 0.11), vec3(0.92, 0.70, 0.96), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
