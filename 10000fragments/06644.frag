uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 28.46 - t * 3.51 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.51;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.00) * p * 18.42;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.60;
	float v = smoothstep(rad, rad - 0.11, length(hf));
	vec3 col = mix(vec3(0.11, 0.08, 0.07), vec3(0.82, 0.86, 0.69), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
