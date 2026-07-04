uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.14) - 0.5;
    float rad = 0.30 + 0.12 * sin(t * 0.95 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.18;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.22) * p * 21.04;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = mix(vec3(0.88, 0.94, 0.66), vec3(0.13, 0.14, 0.14), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
