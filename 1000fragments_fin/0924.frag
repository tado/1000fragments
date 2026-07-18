uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    vec3 col = a + b * cos(6.28318 * (c * t + d));
    return mix(vec3(dot(col, vec3(0.333, 0.334, 0.333))), col, 0.80);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.38 + ph), sin(lt * 3.0 + t * 1.14)) * 0.62;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.98) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.y += sin(p.x * 1.45 + (time * 0.92) * 0.83) * 0.19;
	float an = atan(p.y, p.x);
	float r = length(p) + 0.0001;
	vec2 tv = vec2(an * 2.15 / 3.1415927, 0.47 / r + (time * 0.92) * 0.94);
	float d = field(tv, (time * 0.92), 0.0);
	vec3 col = palette((d) * 1.18 + (time * 0.92) * 0.03, vec3(0.46, 0.27, 0.18), vec3(0.46, 0.31, 0.20), vec3(0.97, 0.99, 0.98), vec3(0.02, 0.10, 0.22));
	col *= clamp(r * 2.87, 0.0, 1.0);
	col = clamp((col - 0.5) * 1.52 + 0.5, 0.0, 1.0);
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.35);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.19);
	col *= vec3(1.008, 1.001, 0.996);
	col += 0.022;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.38 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
