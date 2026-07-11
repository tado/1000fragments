uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.96) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 2.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 2.21;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(2.56) * p; }
	p = abs(p) - 0.34;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(1.40, 0.87, 1.06) + vec3(0.18, 0.27, 0.03);
	col = mod(col * 2.13, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
