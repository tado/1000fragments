uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.46) - 0.5;
    float rad = 0.24 + 0.12 * sin(t * 0.69 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + 0.48 * fr * fr; }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.57; p = rot2(2.44) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.22 + time * 0.00, vec3(0.53, 0.45, 0.41), vec3(0.35, 0.32, 0.40), vec3(1.23, 1.16, 0.72), vec3(0.89, 0.51, 0.59));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.66 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
