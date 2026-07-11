uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 hue(float h){
    return clamp(abs(mod(h * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
}

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 2.0 + t * 0.70 + ph), sin(lt * 4.0 + t * 0.77)) * 0.72;
        md = min(md, length(p - lp)); }
    v = exp(-md * 9.73) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.14;
	float d = field(p, time, 0.0);
	vec3 col = hue(d * 1.37 + time * 0.18);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
