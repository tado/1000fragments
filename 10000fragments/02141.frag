uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 8.46 + t * 2.75 + ph) + sin(p.y * 2.01 - t * 2.43 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.21;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.72) * p * 9.35;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.79, 0.74, 0.82), vec3(0.05, 0.08, 0.11), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
