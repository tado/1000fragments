uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float zx = abs(fract(p.x * 2.19 + t * 0.89) - 0.5) * 2.0;
    v = sin((p.y * 7.55 + zx * 0.98 + t * 2.51) * 3.1415927 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.99;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.29) * p * 20.08;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.16, length(hf));
	vec3 col = mix(vec3(0.14, 0.04, 0.09), vec3(0.88, 0.89, 0.88), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
