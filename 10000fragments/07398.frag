uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 5.30 + t * 5.67 + ph) + sin(p.y * 14.71 - t * 3.54 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.52; p = rot2(0.97) * p; }
	p = rot2(2.90) * p;
	{ float fr = length(p); p *= 1.0 + -0.64 * fr * fr; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.87), field(p, time, 1.75));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
