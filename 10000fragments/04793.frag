uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.66 + t * 4.11 + ph) + sin(p.y * 2.02 - t * 4.11 + ph)
        + sin((p.x + p.y) * 9.16 + t * 4.11 + ph) + sin(length(p) * 14.97 - t * 4.11 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.54) * p * 11.12;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.09, length(hf));
	vec3 col = mix(vec3(0.09, 0.12, 0.04), vec3(0.93, 0.97, 0.79), v);
	col = clamp((col - 0.5) * 2.11 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
