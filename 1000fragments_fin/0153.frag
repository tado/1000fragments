uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 3.0 + t * 0.72 + ph), sin(lt * 3.0 + t * 0.75)) * 0.74;
        md = min(md, length(p - lp)); }
    v = exp(-md * 3.66) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p.x = abs(p.x);
	p.y = abs(p.y);
	p *= 1.02;
	float d = field(p, (time * 0.57), 0.0);
	vec3 col = vec3(0.992, 0.842, 0.455) * (0.11 / (abs(d) + 0.04));
	col = col / (1.0 + col);
	col = pow(clamp(col, 0.0, 1.0), vec3(0.51));
	col = clamp(col, 0.0, 1.0);
	col = mix(col, col * col * (3.0 - 2.0 * col), 0.54);
	col = mix(vec3(dot(col, vec3(0.299, 0.587, 0.114))), col, 1.07);
	col *= vec3(0.988, 1.010, 0.988);
	col += 0.005;
	vec2 fq = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 0.57 * dot(fq, fq);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
