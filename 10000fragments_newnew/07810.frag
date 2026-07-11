uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 4.82 - t * 1.76;
    v = sin(floor(lv * 4.8) / 4.8 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.21;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.88) * p * 19.61;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.19, length(hf));
	vec3 col = mix(vec3(0.96, 0.86, 0.82), vec3(0.00, 0.04, 0.08), v);
	col *= 0.82 + 0.16 * sin(gl_FragCoord.y * 2.46 + time * 10.90);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
