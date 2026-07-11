uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.49) - 0.5;
    float rad = 0.32 + 0.12 * sin(t * 2.72 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = rot2(time * 0.43) * p;
	p = rot2(1.36) * p;
	{ p = vec2(atan(p.y, p.x) * 1.57, length(p) * 2.47 - time * 0.77); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.36; p = rot2(2.26) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.44), field(p, time, 0.89));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
