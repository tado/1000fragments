uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.84 + ph), sin(lt * 3.0 + t * 0.86)) * 0.73;
        md = min(md, length(p - lp)); }
    v = exp(-md * 5.38) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.38;
	p = (floor(p * 20.5) + 0.5) / 20.5;
	p = rot2(time * 1.39) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.92), field(p, time, 1.85));
	col = 0.5 + 0.5 * col;
	col = pow(clamp(col, 0.0, 1.0), vec3(1.11));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
