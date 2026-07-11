uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.55);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.75 + ph), sin(lt * 2.0 + t * 1.26)) * 0.77;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.53) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p.y += sin(p.x * 2.45 + (time * 0.67) * 0.92) * 0.18;
	p.x += p.y * 0.52;
	float d = 0.5 + 0.5 * field(p, (time * 0.67), 0.0);
	vec2 hq = rot2(0.26) * p * 8.71;
	vec2 hf = fract(hq) - 0.5;
	float rad = clamp(d, 0.0, 1.0) * 0.53;
	float v = smoothstep(rad, rad - 0.13, length(hf));
	vec3 col = palette(d * 1.04 + (time * 0.67) * 0.21, vec3(0.40, 0.41, 0.51), vec3(0.18, 0.22, 0.13), vec3(0.87, 0.64, 0.41), vec3(0.07, 0.27, 0.19)) * v;
	col += (hash21(gl_FragCoord.xy + fract((time * 0.67)) * 100.0) - 0.5) * 0.12;
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 0.64);
	col = clamp(col, 0.0, 1.0) * vec3(1.025, 0.972, 0.920) * 1.00 + 0.040;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
