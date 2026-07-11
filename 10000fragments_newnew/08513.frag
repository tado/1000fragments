uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 9; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 2.16 * sin(mf + 3.0) + ph), cos(t * 1.91 * cos(mf + 3.0) + ph));
        ms += 0.098 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.54;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.26) * p * 15.83;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.63;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = mix(vec3(0.07, 0.09, 0.05), vec3(0.84, 0.78, 0.65), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
