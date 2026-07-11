uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 25.89 + sin(p.y * 1.40 + t * 4.50) * 4.51 + ph);
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.16;
	p = (floor(p * 19.6) + 0.5) / 19.6;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.23; p = rot2(2.60) * p; }
	{ float fr = length(p); p *= 1.0 + -0.73 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.20), field(p, time, 2.39));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
