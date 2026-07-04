uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.50 * sin(mf + 3.0) + ph), cos(t * 1.43 * cos(mf + 3.0) + ph));
        ms += 0.051 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.78;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.23) * p * 15.74;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.58;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.06 + time * 0.02, vec3(0.45, 0.50, 0.43), vec3(0.35, 0.39, 0.40), vec3(0.90, 1.00, 1.21), vec3(0.97, 0.68, 0.05)) * v;
	col *= 0.84 + 0.20 * sin(gl_FragCoord.y * 0.86 + time * 8.67);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
