uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 20.13 + sin(p.y * 1.64 + t * 3.84) * 2.80 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.43) * p * 21.32;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.69;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.14, 0.00, 0.12), vec3(0.83, 0.75, 0.69), v);
	col *= 0.86 + 0.17 * sin(gl_FragCoord.y * 1.94 + time * 12.13);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
