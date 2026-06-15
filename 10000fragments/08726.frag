uniform float time;
uniform vec2 resolution;
out vec4 fragColor;

vec3 palette(float t, vec3 a, vec3 b, vec3 c, vec3 d){
    return a + b * cos(6.28318 * (c * t + d));
}

float field(vec2 p, float t, float ph){
    float v;
    v = 0.5 * (sin(p.x * 9.23 + t * 4.16 + ph) + sin(p.y * 8.72 - t * 2.92 + ph));
    return v;
}

void main(){
	vec2 p = gl_FragCoord.xy / resolution.xy - 0.5;
	p.x *= resolution.x / resolution.y;
	p *= 1.40;
	float d = field(p, time, 0.0);
	vec3 col = palette(d * 2.00 + time * 0.04, vec3(0.53, 0.53, 0.48), vec3(0.49, 0.50, 0.37), vec3(0.85, 0.88, 1.28), vec3(0.79, 0.38, 0.48));
	fragColor = TDOutputSwizzle(vec4(col, 1.0));
}
