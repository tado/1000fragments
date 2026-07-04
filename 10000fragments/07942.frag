uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 5.0 + t * 0.36 + ph), sin(lt * 4.0 + t * 1.48)) * 0.71;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.54) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec2 hq = rot2(0.78) * p * 12.39;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.53;
	float v = smoothstep(rad, rad - 0.15, length(hf));
	vec3 col = mix(vec3(0.99, 0.95, 1.00), vec3(0.06, 0.05, 0.02), v);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
