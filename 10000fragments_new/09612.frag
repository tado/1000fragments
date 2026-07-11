uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 7.83) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 2.37 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.77;
	p = rot2(length(p) * 2.60 + time * 0.56) * p;
	{ p = vec2(atan(p.y, p.x) * 1.42, length(p) * 2.78 - time * 0.67); }
	{ float fr = length(p); p *= 1.0 + 0.67 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.85 + time * 0.07, vec3(0.43, 0.52, 0.45), vec3(0.47, 0.35, 0.38), vec3(0.85, 0.77, 1.39), vec3(0.31, 0.42, 0.74));
	col = mod(col * 2.44, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
