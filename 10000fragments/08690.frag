uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.25 * (sin(p.x * 3.82 + t * 1.22 + ph) + sin(p.y * 5.44 - t * 1.22 + ph)
        + sin((p.x + p.y) * 6.13 + t * 1.22 + ph) + sin(length(p) * 17.83 - t * 1.22 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = rot2(2.84) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.20; p = rot2(0.59) * p; }
	{ float fr = length(p); p *= 1.0 + 0.73 * fr * fr; }
	p = abs(p);
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 1.27), field(p, time, 2.54));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
