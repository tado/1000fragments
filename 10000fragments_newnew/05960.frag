uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 11; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.84 * sin(mf + 3.0) + ph), cos(t * 1.83 * cos(mf + 3.0) + ph));
        ms += 0.030 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.83;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.70) * p * 16.46;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.73;
	float v = smoothstep(rad, rad - 0.17, length(hf));
	vec3 col = mix(vec3(0.77, 0.92, 0.63), vec3(0.04, 0.05, 0.11), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
