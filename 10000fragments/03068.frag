uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.96) - 0.5;
    float rad = 0.27 + 0.12 * sin(t * 3.55 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.89;
	{ p = vec2(atan(p.y, p.x) * 1.61, length(p) * 3.64 - time * 0.79); }
	for(int fo = 0; fo < 5; fo++){ p = abs(p) - 0.44; p = rot2(2.00) * p; }
	p = rot2(p.y * 3.46 + time * 0.62) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.06 + time * 0.05, vec3(0.58, 0.55, 0.51), vec3(0.48, 0.47, 0.46), vec3(1.34, 0.86, 1.30), vec3(0.01, 0.96, 0.60));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
