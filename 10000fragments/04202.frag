uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 2.25, t * 0.95 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 0.89;
	p = rot2(p.y * -3.09 + time * 0.96) * p;
	p = mix(p, p.yx, 0.5 + 0.5 * sin(time * 1.56));
	p *= 3.06;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.37 + time * 0.08, vec3(0.54, 0.44, 0.59), vec3(0.40, 0.40, 0.49), vec3(1.15, 0.71, 1.29), vec3(0.16, 0.39, 0.78));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
