uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.33) - 0.5;
    float rad = 0.40 + 0.12 * sin(t * 2.30 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p = rot2(length(p) * 3.27 + time * 0.48) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.16; p = rot2(0.56) * p; }
	vec3 col = vec3(field(p, time, 0.0), field(p, time, 0.43), field(p, time, 0.87));
	col = 0.5 + 0.5 * col;
	col = clamp((col - 0.5) * 1.22 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
