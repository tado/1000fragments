uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.79 + sin(p.y * 1.38 + t * 3.84) * 1.27 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.03;
	{ p = vec2(atan(p.y, p.x) * 2.05, length(p) * 2.32 - time * 0.16); }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 0.80 + time * 0.15, vec3(0.44, 0.58, 0.60), vec3(0.44, 0.39, 0.44), vec3(1.32, 0.85, 1.38), vec3(0.22, 0.03, 0.07));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
