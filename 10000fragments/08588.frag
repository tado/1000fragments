uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 1.27 * sin(mf + 3.0) + ph), cos(t * 1.27 * cos(mf + 3.0) + ph));
        ms += 0.086 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.09;
	p = fract(p * 2.88) - 0.5;
	p = rot2(time * -1.05) * p;
	p = rot2(length(p) * 2.57 + time * 1.07) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.50; p = rot2(2.50) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.06, 0.25, 0.18), vec3(0.58, 0.67, 0.87), d);
	col = clamp((col - 0.5) * 1.48 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
