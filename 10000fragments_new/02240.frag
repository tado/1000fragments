uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec2 dp = fract(p * 3.03) - 0.5;
    float rad = 0.21 + 0.12 * sin(t * 1.20 + ph);
    v = (1.0 - smoothstep(0.0, rad, length(dp))) * 2.0 - 1.0;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.50;
	p += vec2(-0.28, -0.88) * sin(length(p) * 5.78 - time * 1.91) * 0.26;
	p = rot2(time * -1.24) * p;
	{ p = vec2(atan(p.y, p.x) * 1.07, length(p) * 4.73 - time * 0.68); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.50 + time * 0.18, vec3(0.41, 0.48, 0.49), vec3(0.36, 0.40, 0.36), vec3(1.29, 0.74, 0.85), vec3(0.95, 0.79, 0.63));
	vec2 vg = gl_FragCoord.xy / resolution - 0.5;
	col *= 1.0 - 1.16 * dot(vg, vg);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
