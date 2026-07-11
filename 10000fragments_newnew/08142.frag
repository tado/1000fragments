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
    for(int mi = 0; mi < 12; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.53 * sin(mf + 3.0) + ph), cos(t * 0.48 * cos(mf + 3.0) + ph));
        ms += 0.073 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.73;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(1.26) * p * 8.65;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.64;
	float v = smoothstep(rad, rad - 0.18, length(hf));
	vec3 col = palette(d * 1.08 + time * 0.04, vec3(0.60, 0.54, 0.43), vec3(0.50, 0.42, 0.45), vec3(1.21, 0.82, 1.13), vec3(0.26, 0.24, 0.69)) * v;
	col = mod(col * 1.35, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
