uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.48 + ph), sin(lt * 5.0 + t * 0.42)) * 0.89;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.29) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.86;
	p += vec2(0.17, -0.44) * sin(length(p) * 4.50 - time * 1.92) * 0.36;
	p = rot2(2.92) * p;
	{ p = vec2(atan(p.y, p.x) * 2.43, length(p) * 5.97 - time * 0.87); }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.76), field(p, time, 1.53));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.03));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
