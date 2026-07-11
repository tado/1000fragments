uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 17.81 + sin(p.y * 3.80 + t * 4.25) * 1.23 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.26 * fr * fr; }
	p = abs(p) - 0.49;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.69 + time * 0.23, vec3(0.49, 0.52, 0.54), vec3(0.40, 0.44, 0.49), vec3(1.07, 1.05, 1.30), vec3(0.02, 0.97, 0.46));
	col = mod(col * 2.43, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
