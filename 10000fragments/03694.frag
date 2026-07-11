uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.20) - 0.5;
    float rad = 0.28 + 0.12 * sin(t * 2.97 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.62;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.16; p = rot2(1.31) * p; }
	p = fract(p * 2.30) - 0.5;
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.80), field(p, time, 1.60));
	col = 0.5 + 0.5 * col;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
