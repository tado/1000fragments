uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 8.00 + t * 1.02 + ph) + sin(p.y * 4.63 - t * 1.02 + ph)
        + sin((p.x + p.y) * 10.64 + t * 1.02 + ph) + sin(length(p) * 17.70 - t * 1.02 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.96) * p * 22.72;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.83, 0.98, 0.97), vec3(0.11, 0.07, 0.13), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
