uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = sin(p.x * 9.01 + sin(p.y * 2.80 + t * 3.95) * 1.88 + ph);
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p = fract(p * 2.40) - 0.5;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 1.92 + time * 0.25, vec3(0.51, 0.47, 0.41), vec3(0.35, 0.46, 0.39), vec3(1.30, 1.09, 1.35), vec3(0.52, 0.06, 0.85));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
