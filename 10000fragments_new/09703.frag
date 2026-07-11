uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.40 + ph), sin(lt * 2.0 + t * 1.00)) * 0.87;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.86) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.59;
	p = (floor(p * 22.0) + 0.5) / 22.0;
	p = rot2(length(p) * -1.64 + time * 1.11) * p;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.43, 0.45, 0.06), vec3(0.63, 0.76, 0.94), d);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
