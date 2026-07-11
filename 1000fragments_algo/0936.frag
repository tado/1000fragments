uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 kp = p * 1.68;
    for(int ki = 0; ki < 4; ki++){ kp = abs(kp) - 0.56; kp = rot2(1.31) * kp; kp *= 1.38; }
    v = sin(kp.y * 2.85 - t * 1.75 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = p.yx;
	p.y = abs(p.y);
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 1.75 / 3.1415927, 0.72 / r - (time * 0.59) * 2.71);
	float d = field(tv, (time * 0.59), 0.0);
	float cc = clamp(0.5 + 0.5 * (d), 0.0, 1.0);
	vec3 col = mix(vec3(0.13, 0.12, 0.11), vec3(0.57, 0.56, 0.64), cc);
	col *= clamp(r * 2.16, 0.0, 1.0);
	col += (hash21(gl_FragCoord.xy + fract((time * 0.59)) * 100.0) - 0.5) * 0.06;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.40);
	col = clamp(col, 0.0, 1.0) * vec3(1.000, 0.950, 1.011) * 1.00 + 0.047;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
