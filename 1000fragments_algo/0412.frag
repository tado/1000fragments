uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 5.86 + t * 2.56 + ph) + sin(p.y * 12.18 - t * 2.56 + ph)
        + sin((p.x + p.y) * 10.32 + t * 2.56 + ph) + sin(length(p) * 4.28 - t * 2.56 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p += vec2(sin((time * 0.64) * 0.32), cos((time * 0.64) * 0.97)) * 0.15;
	p.x *= resolution.x / resolution.y;
	p *= 2.36;
	float d = 0.5 + 0.5 * field(p, (time * 0.64), 0.0);
	vec2 hq = rot2(0.35) * p * 16.33;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.68;
	float v = smoothstep(rad, rad - 0.14, length(hf));
	vec3 col = mix(vec3(0.90, 0.96, 1.00), vec3(0.09, 0.13, 0.02), v);
	col = floor(clamp(col, 0.0, 1.0) * 5.0) / 5.0;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(0.930, 0.998, 1.052) * 1.00 + 0.029;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
