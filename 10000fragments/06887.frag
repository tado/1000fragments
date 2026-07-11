uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.73, t * 0.62 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p += vec2(-0.62, 0.11) * sin(length(p) * 4.10 - time * 1.22) * 0.12;
	p = rot2(0.55) * p;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.11 + time * 0.19, vec3(0.43, 0.52, 0.53), vec3(0.32, 0.32, 0.39), vec3(1.12, 0.78, 1.10), vec3(0.27, 0.25, 0.52));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
