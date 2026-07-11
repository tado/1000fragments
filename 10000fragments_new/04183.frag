uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 1.0 + t * 0.92 + ph), sin(lt * 4.0 + t * 1.11)) * 0.66;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.43) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.73;
	p += vec2(-0.79, -0.04) * sin(length(p) * 2.25 - time * 0.97) * 0.39;
	p = rot2(length(p) * 1.52 + time * 1.07) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.19; p = rot2(2.11) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.40), field(p, time, 0.79));
	col = 0.5 + 0.5 * col;
	col = mod(col * 2.87, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
