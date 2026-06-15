uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.36 + t * 2.10 + ph) + sin(p.y * 12.06 - t * 1.97 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	{ float fr = length(p); p *= 1.0 + -0.47 * fr * fr; }
	p = abs(p) - 0.32;
	p = fract(p * 1.89) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.08 + time * 0.22, vec3(0.42, 0.50, 0.52), vec3(0.46, 0.33, 0.41), vec3(1.21, 0.80, 0.80), vec3(0.88, 0.56, 0.73));
	col = mod(col * 2.21, 1.0);
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
