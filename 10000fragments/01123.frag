uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 13.95 + sin(p.y * 4.00 + t * 4.64) * 1.06 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.96;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.20));
	p = rot2(time * -0.34) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.73 + time * 0.04, vec3(0.48, 0.59, 0.59), vec3(0.41, 0.41, 0.46), vec3(1.32, 1.33, 1.00), vec3(0.05, 0.60, 0.70));
	col = fract(col * 2.34);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
