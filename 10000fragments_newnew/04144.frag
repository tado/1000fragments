uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 12.20 + t * 3.02 + ph) + sin(p.y * 3.13 - t * 3.02 + ph)
        + sin((p.x + p.y) * 4.26 + t * 3.02 + ph) + sin(length(p) * 6.55 - t * 3.02 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.92) * p * 22.40;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = mix(vec3(0.95, 0.82, 0.73), vec3(0.06, 0.11, 0.16), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
