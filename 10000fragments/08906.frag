uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    float ms = 0.0;
    for(int mi = 0; mi < 7; mi++){ float mf = float(mi);
        vec2 mm = vec2(sin(t * 0.55 * sin(mf + 3.0) + ph), cos(t * 0.55 * cos(mf + 3.0) + ph));
        ms += 0.030 / length(p - mm); }
    v = ms / (1.0 + abs(ms)) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.61;
	p = abs(p);
	{ float fr = length(p); p *= 1.0 + -0.70 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.44; p = rot2(2.57) * p; }
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.35, 0.20, 0.41), vec3(0.50, 0.80, 0.42), d);
	col = mod(col * 2.31, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
