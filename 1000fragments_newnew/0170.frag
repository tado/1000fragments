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
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.73 + ph), sin(lt * 2.0 + t * 0.81)) * 0.93;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.85) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, (time * 0.84), 0.0);
	vec2 hq = rot2(1.28) * p * 18.46;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.61;
	float v = smoothstep(rad, rad - 0.10, length(hf));
	vec3 col = palette(d * 0.65 + (time * 0.84) * 0.11, vec3(0.39, 0.29, 0.41), vec3(0.26, 0.25, 0.20), vec3(0.80, 0.52, 0.74), vec3(0.01, 0.21, 0.73)) * v;
	col *= 0.87 + 0.16 * sin(gl_FragCoord.y * 2.21 + (time * 0.84) * 5.09);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.39);
	col = clamp(col, 0.0, 1.0) * vec3(1.057, 0.989, 0.947) * 1.00 + 0.026;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
