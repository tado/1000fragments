uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 3.57 + t * 3.47 + ph) + sin(p.y * 9.05 - t * 5.23 + ph));
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.40; p = rot2(0.75) * p; }
	p = abs(p) - 0.77;
	p *= 1.40;
	{ float fr = length(p); p *= 1.0 + 0.60 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.81), field(p, time, 1.61));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.90 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
