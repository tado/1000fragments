uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    vec3 g = vec3(p * 8.75, t * 1.32 + ph);
    v = (sin(g.x) * cos(g.y) + sin(g.y) * cos(g.z) + sin(g.z) * cos(g.x)) * 0.5;
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ p = vec2(atan(p.y, p.x) * 1.55, length(p) * 2.49 - time * 0.13); }
	{ float fr = length(p); p *= 1.0 + 0.56 * fr * fr; }
	p += vec2(-0.62, -0.78) * sin(length(p) * 4.66 - time * 1.60) * 0.30;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.29 + time * 0.29, vec3(0.51, 0.57, 0.44), vec3(0.48, 0.39, 0.50), vec3(1.09, 1.32, 1.17), vec3(0.04, 0.57, 0.69));
	col = floor(clamp(col, 0.0, 1.0) * 7.0) / 7.0;
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
