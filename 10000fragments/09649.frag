uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.64) - 0.5;
    float rad = 0.42 + 0.12 * sin(t * 2.38 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.93;
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.23; p = rot2(1.33) * p; }
	{ float fr = length(p); p *= 1.0 + 0.75 * fr * fr; }
	p = fract(p * 2.44) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.55, 0.61, 1.50) + vec3(0.28, 0.21, 0.19);
	col = clamp((col - 0.5) * 1.97 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
