uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 2.80) - 0.5;
    float rad = 0.43 + 0.12 * sin(t * 2.85 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.56;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.50; p = rot2(1.53) * p; }
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 0.58));
	p = (floor(p * 6.5) + 0.5) / 6.5;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.5 + 0.5 * d) * vec3(0.67, 1.50, 1.35) + vec3(0.24, 0.20, 0.09);
	col = clamp((col - 0.5) * 1.75 + 0.5, 0.0, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
