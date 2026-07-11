uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.74 * sin(mf + 3.0) + ph), cos(t * 0.83 * cos(mf + 3.0) + ph));
        ms += 0.055 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	float d = 0.5 + 0.5 * field(p, (time * 0.76), 0.0);
	vec2 hq = rot2(0.79) * p * 22.29;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.51;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 1.17 + (time * 0.76) * 0.26, vec3(0.50, 0.36, 0.48), vec3(0.16, 0.12, 0.16), vec3(0.67, 0.41, 0.71), vec3(0.55, 0.32, 0.51)) * v;
	col *= 0.81 + 0.17 * sin(gl_FragCoord.y * 0.97 + (time * 0.76) * 14.88);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.43);
	col = clamp(col, 0.0, 1.0) * vec3(0.917, 0.978, 1.021) * 1.00 + 0.022;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
