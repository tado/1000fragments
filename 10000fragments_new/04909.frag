uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.26) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 3.84 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.76;
	p = rot2(time * 0.78) * p;
	for(int fo = 0; fo < 3; fo++){ p = abs(p) - 0.42; p = rot2(1.08) * p; }
	{ float fr = length(p); p *= 1.0 + 0.20 * fr * fr; }
	p = rot2(length(p) * -2.80 + time * 1.47) * p;
	float d = field(p, time, 0.0);
	vec3 col = vec3(0.68, 0.40, 0.52) * (0.23 / (abs(d) + 0.02));
	col = col / (1.0 + col);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
