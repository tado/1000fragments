uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 cq = p * 11.20 + vec2(t * 1.64, -t * 1.64) + ph;
    v = sign(sin(cq.x) * sin(cq.y));
    return v;
}
float field2(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 4.74) - 0.5;
    float rad = 0.38 + 0.12 * sin(t * 1.38 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p += vec2(-0.77, -0.34) * sin(length(p) * 4.92 - time * 1.97) * 0.28;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.42; p = rot2(1.99) * p; }
	p = abs(p);
	float d1 = field(p, time, 0.0);
	float d2 = field2(p, time, 1.72);
	float d = d1 + d2;
	vec3 col = palette(d * 1.08 + time * 0.23, vec3(0.41, 0.51, 0.44), vec3(0.43, 0.48, 0.41), vec3(1.22, 1.11, 1.27), vec3(0.44, 0.94, 0.27));
	col = mod(col * 1.75, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
