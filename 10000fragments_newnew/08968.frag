uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 1.36 + ph), sin(lt * 2.0 + t * 1.44)) * 0.89;
        md = min(md, length(p - lp)); }
    v = exp(-md * 8.19) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.43;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.83; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.38), field(p, time, 2.76));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
