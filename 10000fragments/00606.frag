uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.11) - 0.5;
    float rad = 0.22 + 0.12 * sin(t * 2.71 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = (gl_FragCoord.xy * 2.0 - resolution) / min(resolution.x, resolution.y);
	p *= 1.64;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.34; p = rot2(1.51) * p; }
	p = fract(p * 2.45) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.99, 0.32, 0.61) * (0.19 / (abs(d) + 0.08));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
