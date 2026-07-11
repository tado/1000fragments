uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * sin(length(p) * 29.13 - t * 8.83 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 2.46;
	p = vec2(p.x * p.x - p.y * p.y, 2.0 * p.x * p.y) * 0.94;
	{ float fr = length(p); p *= 1.0 + 0.75 * fr * fr; }
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.95 + time * 0.24, vec3(0.50, 0.42, 0.55), vec3(0.49, 0.47, 0.47), vec3(0.75, 0.99, 1.39), vec3(0.31, 0.12, 0.89));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
