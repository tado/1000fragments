uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    float lv = length(p) * 5.44 - t * 0.98;
    v = sin(floor(lv * 3.2) / 3.2 * 6.2831853 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.86;
	p.y += sin(p.x * 5.71 + time * 2.45) * 0.14;
	p = fract(p * 1.26) - 0.5;
	p = rot2(time * 1.42) * p;
	p = rot2(p.y * 2.86 + time * 0.31) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.03, vec3(0.45, 0.59, 0.60), vec3(0.40, 0.42, 0.42), vec3(0.94, 1.11, 1.06), vec3(0.62, 0.28, 0.31));
	col = mod(col * 1.53, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
