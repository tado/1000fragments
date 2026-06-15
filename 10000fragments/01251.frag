uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 6.71) - 0.5;
    float rad = 0.35 + 0.12 * sin(t * 2.24 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.30;
	p = abs(p) - 0.74;
	p = rot2(time * 0.42) * p;
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.53; p = rot2(0.57) * p; }
	p = fract(p * 1.08) - 0.5;
	float d = 0.5 + 0.5 * field(p, time, 0.0);
	vec3 col = mix(vec3(0.29, 0.21, 0.07), vec3(0.98, 0.80, 0.59), d);
	col = mod(col * 2.00, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
