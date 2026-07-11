uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.50 + t * 3.67 + ph) + sin(p.y * 8.37 - t * 3.67 + ph)
        + sin((p.x + p.y) * 6.61 + t * 3.67 + ph) + sin(length(p) * 4.62 - t * 3.67 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.87;
	float d = 0.5 + 0.5 * field(p, (time * 0.62), 0.0);
	vec2 hq = rot2(0.83) * p * 13.03;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.62;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.13, 0.08, 0.15), vec3(0.73, 0.82, 0.84), v);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.66));
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.41);
	col = clamp(col, 0.0, 1.0) * vec3(0.981, 0.983, 0.987) * 1.00 + 0.042;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
