uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 5.05) - 0.5;
    float rad = 0.39 + 0.12 * sin(t * 0.81 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.67;
	{ float ka = atan(p.y, p.x); float kr = length(p); float kn = 4.0; ka = mod(ka, 6.2831853 / kn); ka = abs(ka - 3.1415927 / kn); p = kr * vec2(cos(ka), sin(ka)); }
	p *= 2.12;
	p = rot2(time * -0.60) * p;
	for(int fo = 0; fo < 2; fo++){ p = abs(p) - 0.35; p = rot2(1.37) * p; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.55 + time * 0.02, vec3(0.42, 0.58, 0.54), vec3(0.43, 0.48, 0.32), vec3(1.37, 1.04, 1.33), vec3(0.65, 0.56, 0.94));
	col = fract(col * 2.05);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
