uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.87) - 0.5;
    float rad = 0.25 + 0.12 * sin(t * 2.14 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.33;
	{ float fr = length(p); p *= 1.0 + 0.77 * fr * fr; }
	for(int fo = 0; fo < 4; fo++){ p = abs(p) - 0.57; p = rot2(2.40) * p; }
	p *= 2.29;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.71 + time * 0.02, vec3(0.41, 0.59, 0.49), vec3(0.39, 0.39, 0.41), vec3(0.90, 0.99, 1.22), vec3(0.57, 0.98, 0.76));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
