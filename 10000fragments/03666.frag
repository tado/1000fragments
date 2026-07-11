uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.20) - 0.5;
    float rad = 0.23 + 0.12 * sin(t * 2.94 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.19;
	{ float fr = length(p); p *= 1.0 + -0.60 * fr * fr; }
	p = rot2(p.y * -1.36 + time * 0.85) * p;
	p = rot2(1.26) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.53 + time * 0.26, vec3(0.42, 0.44, 0.57), vec3(0.40, 0.35, 0.37), vec3(1.34, 0.93, 1.01), vec3(0.35, 0.54, 0.75));
	col = fract(col * 1.52);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
