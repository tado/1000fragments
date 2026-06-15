uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 18.90 + sin(p.y * 5.33 + t * 2.31) * 2.39 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.03;
	p *= 2.44;
	{ float fr = length(p); p *= 1.0 + -0.36 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.24; p = rot2(1.49) * p; }
	p = rot2(length(p) * 2.47 + time * 0.35) * p;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.26), field(p, time, 0.53));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
