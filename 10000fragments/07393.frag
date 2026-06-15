uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 2.46 + t * 5.55 + ph) + sin(p.y * 10.94 - t * 3.63 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	{ float fr = length(p); p *= 1.0 + 0.37 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.46; p = rot2(1.82) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.40), field(p, time, 2.80));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 2.20 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
