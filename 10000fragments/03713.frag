uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 8.77) - 0.5;
    float rad = 0.44 + 0.12 * sin(t * 2.96 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.67;
	p = rot2(p.y * 2.76 + time * 0.17) * p;
	p += vec2(0.69, 0.03) * sin(length(p) * 3.37 - time * 1.01) * 0.21;
	p = abs(p);
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.54 + time * 0.06, vec3(0.56, 0.51, 0.58), vec3(0.50, 0.31, 0.47), vec3(0.91, 1.30, 1.14), vec3(0.43, 0.89, 0.80));
	col = mod(col * 2.18, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
