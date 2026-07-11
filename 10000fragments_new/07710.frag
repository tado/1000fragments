uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float md = 10.0;
    for(int li = 0; li < 24; li++){ float lt = float(li) * 0.2617994;
        vec2 lp = vec2(sin(lt * 4.0 + t * 0.40 + ph), sin(lt * 1.0 + t * 1.11)) * 0.63;
        md = min(md, length(p - lp)); }
    v = exp(-md * 4.42) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.44; p = rot2(0.97) * p; }
	p = rot2(time * -0.52) * p;
	p = rot2(2.70) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.71, 0.91, 0.58) * (0.24 / (abs(d) + 0.07));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
