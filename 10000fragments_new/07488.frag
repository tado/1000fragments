uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
float hash21(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.42 + ph), sin(lt * 3.0 + t * 0.90)) * 0.54;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.32) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(time * -0.96) * p;
	p = rot2(p.y * -1.32 + time * 0.90) * p;
	p += vec2(-0.54, -0.76) * sin(length(p) * 5.97 - time * 1.12) * 0.31;
	p = rot2(0.46) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.79 + time * 0.28, vec3(0.55, 0.59, 0.48), vec3(0.42, 0.47, 0.30), vec3(1.26, 1.22, 1.08), vec3(0.90, 0.89, 0.16));
	col += (hash21(gl_FragCoord.xy + fract(time) * 100.0) - 0.5) * 0.12;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
