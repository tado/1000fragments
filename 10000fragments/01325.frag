uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 10.47 + t * 2.35 + ph) + sin(p.y * 2.39 - t * 2.35 + ph)
        + sin((p.x + p.y) * 5.71 + t * 2.35 + ph) + sin(length(p) * 3.34 - t * 2.35 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.35;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.64) * p * 8.60;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.56;
	float v = smoothstep(rad, rad - 0.12, length(hf));
	vec3 col = mix(vec3(0.12, 0.10, 0.14), vec3(0.79, 0.84, 0.66), v);
	col = fract(col * 2.46);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
