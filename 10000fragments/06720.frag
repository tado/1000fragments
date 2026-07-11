uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

mat2 rot2(float a){ float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }
vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 4.51, t * 1.93 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.yy - vec2(0.9, 0.5);
	p *= 1.19;
	p = rot2(2.21) * p;
	{ float fr = length(p); p *= 1.0 + 0.55 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.61 + time * 0.12, vec3(0.41, 0.55, 0.52), vec3(0.42, 0.44, 0.45), vec3(1.04, 1.00, 0.75), vec3(0.12, 0.01, 0.68));
	col = pow(clamp(col, 0.0, 1.0), vec3(0.65));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
