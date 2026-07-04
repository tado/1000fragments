uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 8.10 - t * 5.66 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.61;
	{ float iv = dot(p, p) + 0.05; p = p / iv * 0.39; }
	p += vec2(-0.78, -0.18) * sin(length(p) * 4.64 - time * 0.92) * 0.34;
	{ float fr = length(p); p *= 1.0 + 0.47 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.70 + time * 0.03, vec3(0.41, 0.58, 0.50), vec3(0.31, 0.39, 0.47), vec3(0.77, 1.40, 0.83), vec3(0.15, 0.02, 0.80));
	col = fract(col * 1.07);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
