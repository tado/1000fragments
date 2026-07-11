uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 10.58 + t * 1.51 + ph) + sin(p.y * 7.25 - t * 4.90 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.17;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.49; p = rot2(2.49) * p; }
	{ float fr = length(p); p *= 1.0 + -0.61 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.50), field(p, time, 1.01));
	col = 0.5 + 0.5 * col;
	col = fract(col * 1.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
