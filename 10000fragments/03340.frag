uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.82 + ph), sin(lt * 2.0 + t * 0.76)) * 0.92;
        md = min(md, length(p - lp)); }
    v = exp(-md * 7.75) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 2.35;
	p = rot2(time * -0.88) * p;
	p = sin(p * 1.51 + time * 1.88) * 1.05;
	p += vec2(-0.46, 0.37) * sin(length(p) * 2.62 - time * 2.50) * 0.35;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.26 + time * 0.18);
	col = mod(col * 2.71, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
