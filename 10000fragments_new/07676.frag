uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.50) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 3.57 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.45;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.16; p = rot2(1.36) * p; }
	p = rot2(length(p) * 3.04 + time * 1.13) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.55, 0.91, 0.87) * (0.17 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	col = fract(col * 2.03);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
