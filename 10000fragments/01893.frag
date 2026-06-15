uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.72) - 0.5;
    float rad = 0.29 + 0.12 * sin(t * 2.47 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.41;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.26; p = rot2(1.51) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.78), field(p, time, 1.57));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.64 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
